document.addEventListener('DOMContentLoaded', function() {
    // モバイルデバイスかどうかを判定する関数
    function isMobileDevice() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // モバイルメニューの初期化
    function initMobileMenu() {
        // 既存のモバイルメニューがあれば削除
        const existingMenu = document.getElementById('mobileMenu');
        const existingOverlay = document.getElementById('mobileMenuOverlay');
        if (existingMenu) existingMenu.remove();
        if (existingOverlay) existingOverlay.remove();
        
        // モバイルデバイスの場合のみモバイルメニューを作成
        if (isMobileDevice()) {
            const mobileMenuHTML = `
                <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
                <div class="mobile-menu" id="mobileMenu">
                    <div class="mobile-menu-header">
                        <div class="logo">
                            <span class="logo-text">SUGUKAKU</span>
                            <span class="logo-tagline">AI Writing Service</span>
                        </div>
                        <button class="mobile-menu-close" id="mobileMenuClose">×</button>
                    </div>
                    <nav class="mobile-menu-nav">
                        <ul>
                            <li><a href="#service">サービス内容</a></li>
                            <li><a href="#case">お客様の声</a></li>
                            <li><a href="#comparison">他社比較</a></li>
                            <li><a href="#price">料金プラン</a></li>
                            <li><a href="#faq">よくある質問</a></li>
                        </ul>
                    </nav>
                    <div class="mobile-menu-cta">
                        <a href="#contact" class="header-button">
                            <span class="button-icon">📝</span>
                            無料相談はこちら
                        </a>
                    </div>
                </div>
            `;
            
            // bodyに追加
            document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
            
            // モバイルメニューのイベントリスナーを設定
            setupMobileMenuEvents();
        }
    }
    
    // モバイルメニューのイベントリスナーを設定する関数
    function setupMobileMenuEvents() {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        
        if (mobileMenuButton && mobileMenu && mobileMenuOverlay && mobileMenuClose) {
            // メニューを開く
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                mobileMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            // メニューを閉じる
            function closeMobileMenu() {
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            mobileMenuClose.addEventListener('click', closeMobileMenu);
            mobileMenuOverlay.addEventListener('click', closeMobileMenu);
            
            // メニューリンクをクリックしたときも閉じる
            const mobileMenuLinks = document.querySelectorAll('.mobile-menu-nav a');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
            
            // ESCキーでメニューを閉じる
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        }
    }
    
    // 初期化
    initMobileMenu();
    
    // ウィンドウサイズが変更されたときに再初期化
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            initMobileMenu();
            // カルーセルも再初期化
            initVoiceCarousel();
        }, 250);
    });
    
    // スムーズスクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ソリューションセクションのインタラクション
    const solutionPoints = document.querySelectorAll('.solution-point');
    
    solutionPoints.forEach(point => {
        point.addEventListener('click', function() {
            // アクティブクラスを削除
            solutionPoints.forEach(p => p.classList.remove('active'));
            
            // クリックされた要素をアクティブに
            this.classList.add('active');
            
            // すべての画像を非表示
            const allImages = document.querySelectorAll('.solution-img');
            allImages.forEach(img => {
                img.classList.remove('active');
                img.style.display = 'none';
            });
            
            // 対応する画像を表示
            const targetId = this.dataset.target;
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 要素を表示
                if (targetId === 'speed-timer') {
                    targetElement.style.display = 'flex';
                } else {
                    targetElement.style.display = 'block';
                }
                
                // リフローを強制してアニメーションを確実に実行
                void targetElement.offsetWidth;
                
                // アクティブクラスを追加（フェードインアニメーション用）
                targetElement.classList.add('active');
                
                // タイマーの場合はアニメーションを開始
                if (targetId === 'speed-timer') {
                    startTimerAnimation();
                }
            }
        });
    });
    
    // タイマーアニメーション関数
    function startTimerAnimation() {
        const timerProgress = document.querySelector('.timer-progress');
        const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        
        // アニメーションをリセットして再開
        if (timerProgress) {
            timerProgress.style.animation = 'none';
            void timerProgress.offsetWidth;
            timerProgress.style.animation = 'timerProgress 3s ease-out forwards';
        }
        
        if (hourHand) {
            hourHand.style.animation = 'none';
            void hourHand.offsetWidth;
            hourHand.style.animation = 'rotateHour 4s linear infinite';
        }
        
        if (minuteHand) {
            minuteHand.style.animation = 'none';
            void minuteHand.offsetWidth;
            minuteHand.style.animation = 'rotateMinute 2s linear infinite';
        }
    }
    
    // サービスタブ機能
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // すべてのタブボタンとコンテンツからactiveクラスを削除
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // クリックされたタブボタンとコンテンツにactiveクラスを追加
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // FAQ機能
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        if (question && answer && icon) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // すべてのFAQアイテムを閉じる
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqAnswer = faqItem.querySelector('.faq-answer');
                    const faqIcon = faqItem.querySelector('.faq-icon');
                    if (faqAnswer) faqAnswer.style.maxHeight = null;
                    if (faqIcon) faqIcon.textContent = '+';
                });
                
                // クリックされたアイテムが非アクティブだった場合は開く
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.textContent = '−';
                }
            });
        }
    });
    
    // 料金プランボタンの処理
    const planButtons = document.querySelectorAll('.price-button');
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const plan = this.getAttribute('data-plan');
            const planSelect = document.getElementById('plan');
            
            if (planSelect) {
                switch(plan) {
                    case 'light':
                        planSelect.value = 'light';
                        break;
                    case 'standard':
                        planSelect.value = 'standard';
                        break;
                    case 'premium':
                        planSelect.value = 'premium';
                        break;
                }
            }
            
            // お問い合わせフォームまでスクロール
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // フォーム送信処理
    const contactForm = document.getElementById('contactForm');
    const downloadForm = document.getElementById('downloadForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータを取得
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 送信処理（実際の実装では、サーバーにデータを送信）
            console.log('Contact form data:', data);
            
            // 成功メッセージを表示
            alert('お問い合わせありがとうございます。担当者より24時間以内にご連絡いたします。');
            
            // フォームをリセット
            this.reset();
        });
    }
    
    if (downloadForm) {
        downloadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータを取得
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // ダウンロード処理（実際の実装では、サーバーにデータを送信してPDFを生成）
            console.log('Download form data:', data);
            
            // 成功メッセージを表示
            alert('資料をダウンロードいたします。メールアドレスにもお送りいたします。');
            
            // フォームをリセット
            this.reset();
        });
    }
    
    // スクロールアニメーション（必須の処理）
    const animateElements = document.querySelectorAll('.problem-card, .solution-point, .service-tabs, .voice-card-large, .price-card, .process-step');
    
    // IntersectionObserverがサポートされていない場合の処理
    if (!('IntersectionObserver' in window)) {
        animateElements.forEach(element => {
            element.classList.add('animate-in');
        });
    } else {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // 一度アニメーションしたら監視を停止
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // アニメーション対象の要素を監視
        animateElements.forEach(element => {
            observer.observe(element);
        });
        
        // 既に表示領域にある要素は即座にアニメーション
        setTimeout(() => {
            animateElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    element.classList.add('animate-in');
                }
            });
        }, 100);
    }
    
    // ヘッダーのスクロール時の背景変更
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // スクロール方向に応じてヘッダーの表示/非表示
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Client logos slider
    const clientLogosSlider = document.querySelector('.client-logos-slider');
    if (clientLogosSlider) {
        const track = clientLogosSlider.querySelector('.client-logos-track');
        if (track) {
            // Clone the track for seamless loop
            const clone = track.cloneNode(true);
            track.parentNode.appendChild(clone);
        }
    }
    
    // 業界記事表示機能
    const industryItems = document.querySelectorAll('.industry-item[data-industry]');
    const articleTitle = document.getElementById('articleTitle');
    const articleBody = document.getElementById('articleBody');

    // 業界データ（各500文字）
    const industryData = {
        legal: {
            title: '士業向け専門コンテンツ制作で信頼獲得と新規顧客開拓を実現',
            content: '士業の皆様にとって、専門性の高い情報発信は信頼獲得の重要な要素です。当サービスでは、法律・税務・会計などの複雑な内容を、一般の方にも理解しやすい形で記事化いたします。薬機法や景品表示法などのコンプライアンス面も十分に配慮し、事務所の信頼性向上に貢献します。相続問題、企業法務、税務相談など、各分野の専門知識を持つライターが、正確で分かりやすい記事を制作。SEO対策も万全で、「地域名 + 弁護士」「税理士 相談」などのキーワードで上位表示を実現し、新規顧客の獲得をサポートします。事務所のブランディング強化と集客力向上を同時に実現する、士業特化型のコンテンツマーケティングをご提供いたします。法律事務所様では平均してPV数が2.5倍、問い合わせ数が3.2倍に増加し、確実な成果を上げています。'
        },
        saas: {
            title: 'SaaS・IT企業向け技術コンテンツで差別化を実現',
            content: 'SaaS企業にとって、製品の価値を正確に伝える技術コンテンツは不可欠です。当サービスでは、複雑なシステムや機能を、ターゲットユーザーに分かりやすく説明する記事を制作いたします。プロダクトマネージャーやエンジニア出身のライターが、技術的な正確性を保ちながら、マーケティング効果の高いコンテンツを作成します。API仕様書、導入事例、比較記事、ホワイトペーパーなど、多様な形式に対応。「CRM 比較」「業務効率化 ツール」などのビジネス系キーワードで検索上位を狙い、リード獲得を強化します。技術ブログからプロダクト紹介まで、幅広いコンテンツニーズにお応えし、SaaS企業の成長を加速させるマーケティング支援を行います。導入企業様では平均してリード獲得数が4.2倍、無料トライアル登録が3.8倍に増加しています。'
        },
        realestate: {
            title: '不動産業界向け地域密着型コンテンツで集客力アップ',
            content: '不動産業界では、地域に根ざした情報発信が成功の鍵となります。当サービスでは、各エリアの特性を深く理解した地域密着型の記事を大量制作し、幅広い検索キーワードでの上位表示を実現します。「○○市 マンション」「△△駅 賃貸」など、地域×物件タイプの組み合わせで網羅的にコンテンツを展開し、集客力を大幅に向上させます。物件紹介、エリアガイド、住宅ローン情報、投資物件分析など、多角的なアプローチで潜在顧客にアプローチ。宅建士資格を持つライターが、法令遵守を徹底しながら、信頼性の高い情報を提供します。SEO効果により問い合わせ数が4倍に増加した実績もあり、不動産会社の売上向上に直結するコンテンツマーケティングを展開。地域No.1の認知度獲得を目指します。'
        },
        finance: {
            title: '金融・保険業界向け信頼性重視のコンテンツ制作',
            content: '金融・保険業界では、複雑な商品内容を分かりやすく説明し、顧客の理解を深めることが重要です。当サービスでは、ファイナンシャルプランナーや保険業界経験者が、専門知識を活かして正確で信頼性の高い記事を制作いたします。金融商品取引法や保険業法などの法規制を遵守し、コンプライアンス面でも安心してご利用いただけます。投資信託、生命保険、住宅ローン、資産運用など、幅広い金融商品について、初心者にも理解しやすい解説記事を作成。「NISA 始め方」「生命保険 選び方」などの検索ボリュームの大きいキーワードで上位表示を狙い、新規顧客の獲得を支援します。資料請求数4.5倍、契約数2.1倍の実績を誇り、金融機関の業績向上に貢献するコンテンツマーケティングを提供いたします。'
        },
        healthcare: {
            title: '医療・ヘルスケア業界向け薬機法対応コンテンツ',
            content: '医療・ヘルスケア分野では、正確性と信頼性が最も重要視されます。当サービスでは、医師・看護師・薬剤師などの医療従事者が監修し、薬機法や医療法に完全準拠した記事を制作いたします。患者様の健康に関わる情報を扱うため、エビデンスに基づいた正確な内容のみを提供し、医療機関の信頼性向上に貢献します。疾患解説、治療方法、予防法、健康管理など、幅広い医療情報を患者様に分かりやすく伝える記事を作成。「○○病院 診療科」「△△治療 専門医」などの地域医療キーワードで検索上位を実現し、オンライン予約や来院数の増加を実現します。医療広告ガイドラインを遵守し、患者様からの信頼度向上と予約数3.8倍の実績を誇る、医療機関専門のコンテンツマーケティングサービスです。'
        },
        hr: {
            title: '人材・採用業界向け求職者獲得コンテンツ',
            content: '人材・採用業界では、求職者と企業の双方に価値のある情報提供が成功の鍵となります。当サービスでは、キャリアコンサルタントや人事経験者が、転職ノウハウ、業界情報、企業分析などの記事を制作し、求職者の関心を引きつけるコンテンツを大量展開いたします。「転職 コツ」「面接 対策」などの検索ボリュームの大きいキーワードで上位表示を実現します。職種別転職ガイド、履歴書・職務経歴書の書き方、面接対策、年収交渉術など、求職者が求める実践的な情報を提供。企業向けには採用ブランディングや人事制度の記事も制作し、採用力強化を支援します。SEO効果により求職者からの応募数が大幅に増加し、人材紹介会社の売上向上に直結するコンテンツマーケティングを展開。採用成功率の向上と企業ブランディングの両立を実現いたします。'
        },
        education: {
            title: '教育・研修業界向け学習促進コンテンツ',
            content: '教育・研修業界では、学習者の関心を引きつけ、継続的な学習を促進するコンテンツが重要です。当サービスでは、教育関係者や各分野の専門家が、分かりやすく実践的な学習コンテンツを制作いたします。オンライン学習、資格取得、スキルアップなど、多様な学習ニーズに対応し、受講者の満足度向上と継続率アップを実現します。学習ガイド、試験対策、業界トレンド、キャリア情報など、学習者が求める価値の高い情報を提供。「○○資格 勉強法」「△△スキル 習得」などの学習系キーワードで検索上位を狙い、新規受講者の獲得を支援します。教育効果の高いコンテンツにより、受講者のエンゲージメントが向上し、口コミによる紹介も増加。教育機関の信頼性向上と受講者数増加を同時に実現する、教育業界特化型のコンテンツマーケティングを提供いたします。'
        },
        beauty: {
            title: '美容・コスメ業界向けトレンド対応コンテンツ',
            content: '美容・コスメ業界では、常に変化するトレンドに対応し、消費者の関心を引きつけるコンテンツが求められます。当サービスでは、美容師、エステティシャン、化粧品開発経験者などの専門家が、最新の美容情報やスキンケア・メイクテクニックを分かりやすく記事化いたします。薬機法や景品表示法を遵守し、安全で信頼性の高い情報のみを提供いたします。スキンケア方法、メイクテクニック、ヘアケア、ネイルアート、美容機器レビューなど、幅広い美容情報を網羅。「敏感肌 化粧水」「アンチエイジング 美容液」などの購買意欲の高いキーワードで検索上位を実現し、ECサイトへの流入とコンバージョン率向上を支援します。美容業界の法規制を熟知したライターが、ブランドイメージを損なうことなく、効果的なマーケティングコンテンツを制作いたします。'
        },
        manufacturing: {
            title: '製造業向け技術・製品紹介コンテンツ',
            content: '製造業では、複雑な技術や製品仕様を分かりやすく説明し、顧客の理解を深めることが重要です。当サービスでは、エンジニアや技術者出身のライターが、専門的な製品情報を顧客のレベルに合わせて記事化いたします。BtoB向けの技術解説から、一般消費者向けの製品紹介まで、幅広いニーズに対応し、製造業の販売促進を支援いたします。製品カタログ、技術資料、導入事例、メンテナンス情報、業界動向など、多角的なアプローチで潜在顧客にアプローチ。「○○装置 メーカー」「△△部品 仕様」などの専門性の高いキーワードで検索上位を実現し、技術者や購買担当者からの問い合わせ増加を実現します。製造業特有の長い検討期間に対応し、段階的な情報提供により、最終的な受注獲得まで一貫してサポートする、製造業専門のコンテンツマーケティングを展開いたします。'
        },
        others: {
            title: 'あらゆる業界に対応した専門コンテンツ制作',
            content: '当サービスでは、上記以外にも飲食業、小売業、物流業、建設業、農業、エンターテイメント業など、あらゆる業界のコンテンツ制作に対応しております。各業界の特性や顧客ニーズを深く理解した専門ライターが、業界特有の専門用語や商慣習を踏まえた、効果的な記事を制作いたします。どのような業界でも、まずはお気軽にご相談ください。業界固有の課題やトレンドを踏まえ、ターゲット顧客に響くコンテンツを企画・制作。競合他社との差別化を図りながら、SEO効果の高い記事で検索上位表示を実現します。新規参入業界でも、短期間で業界知識を習得し、専門性の高いコンテンツを提供できるのが当サービスの強みです。400社以上の導入実績で培ったノウハウを活かし、あらゆる業界の成長を支援するコンテンツマーケティングサービスを提供いたします。'
        }
    };

    // 各業界アイテムにクリックイベントを追加
    industryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 全てのアクティブ状態を削除
            industryItems.forEach(i => i.classList.remove('active'));
            
            // クリックされたアイテムをアクティブに
            this.classList.add('active');
            
            const industry = this.getAttribute('data-industry');
            if (industryData[industry]) {
                articleTitle.textContent = industryData[industry].title;
                articleBody.innerHTML = `<p>${industryData[industry].content}</p>`;
            }
        });
    });
    
    // お客様の声カルーセル初期化
    initVoiceCarousel();
    
    // 初期化完了
    console.log('SUGUKAKU LP initialized successfully');
});

// お客様の声カルーセル機能（修正版）
function initVoiceCarousel() {
    // 既存のイベントリスナーをクリア
    const existingCarousel = window.voiceCarouselInstance;
    if (existingCarousel) {
        existingCarousel.destroy();
    }
    
    const track = document.getElementById('voiceCarouselTrack');
    const indicatorsContainer = document.getElementById('voiceCarouselIndicators');
    const desktopGrid = document.querySelector('.voice-cards-grid.desktop-only');
    const mobileCarousel = document.querySelector('.voice-carousel.mobile-tablet-only');
    
    // 画面サイズに応じて表示を切り替える関数
    function toggleDisplayBasedOnScreenSize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            if (desktopGrid) {
                desktopGrid.style.display = 'none';
            }
            if (mobileCarousel) {
                mobileCarousel.style.display = 'block';
            }
        } else {
            if (desktopGrid) {
                desktopGrid.style.display = 'grid';
            }
            if (mobileCarousel) {
                mobileCarousel.style.display = 'none';
            }
        }
    }
    
    // 初期表示設定
    toggleDisplayBasedOnScreenSize();
    
    // カルーセルが必要な場合のみ初期化
    if (window.innerWidth <= 768 && track && indicatorsContainer) {
        const slides = track.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        let currentSlide = 0;
        let isTransitioning = false;
        
        // スライド幅の計算関数
        function getSlideWidth() {
            const containerWidth = track.parentElement.offsetWidth;
            const screenWidth = window.innerWidth;
            
            if (screenWidth <= 360) {
                return containerWidth * 0.85;
            } else if (screenWidth <= 480) {
                return containerWidth * 0.82;
            } else if (screenWidth <= 768) {
                return containerWidth * 0.80;
            } else {
                return containerWidth * 0.80;
            }
        }
        
        // スライドの初期設定
        function setupSlides() {
            const slideWidth = getSlideWidth();
            slides.forEach((slide) => {
                slide.style.width = slideWidth + 'px';
                slide.style.minWidth = slideWidth + 'px';
                slide.style.maxWidth = slideWidth + 'px';
            });
        }
        
        // インジケーターを生成
        function createIndicators() {
            indicatorsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('div');
                indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
                indicator.setAttribute('data-slide', i);
                indicator.addEventListener('click', () => {
                    goToSlide(i);
                });
                indicatorsContainer.appendChild(indicator);
            }
        }
        
        // スライドを移動
        function goToSlide(slideIndex) {
            if (isTransitioning || slideIndex === currentSlide || slideIndex < 0 || slideIndex >= totalSlides) {
                return;
            }
            
            isTransitioning = true;
            currentSlide = slideIndex;
            
            const slideWidth = getSlideWidth();
            const translateX = -(slideIndex * slideWidth);
            
            track.style.transform = `translateX(${translateX}px)`;
            updateIndicators();
            
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
        
        // インジケーターを更新
        function updateIndicators() {
            const indicators = indicatorsContainer.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
        
        // タッチ/スワイプ対応
        let startX = 0;
        let endX = 0;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // 左スワイプ：次へ
                    const nextIndex = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
                    goToSlide(nextIndex);
                } else {
                    // 右スワイプ：前へ
                    const prevIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
                    goToSlide(prevIndex);
                }
            }
        }, { passive: true });
        
        // リサイズ時の再計算
        function handleResize() {
            setupSlides();
            goToSlide(currentSlide);
        }
        
        window.addEventListener('resize', handleResize);
        
        // 初期化
        setupSlides();
        createIndicators();
        goToSlide(0);
        
        // カルーセルインスタンスを保存
        window.voiceCarouselInstance = {
            destroy: function() {
                window.removeEventListener('resize', handleResize);
            }
        };
    }
    
    // リサイズ時の処理
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(toggleDisplayBasedOnScreenSize, 100);
    });
}


// パフォーマンス最適化
window.addEventListener('load', function() {
    // 遅延読み込み画像の処理
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // フォールバック
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
        });
    }
});
