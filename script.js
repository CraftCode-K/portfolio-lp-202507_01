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
                            <li><a href="#case">導入事例</a></li>
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
    
    // 業界モーダル機能
const industryItems = document.querySelectorAll('.industry-item');
const modal = document.getElementById('industryModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalClose = document.querySelector('.modal-close');

const industryData = {
    legal: {
        title: '士業',
        content: `弁護士事務所、司法書士事務所、税理士事務所、行政書士事務所、社会保険労務士事務所など、あらゆる士業向けに専門性の高い記事を制作いたします。
法律解説記事では、一般の方にも分かりやすい平易な表現を心がけながら、法的な正確性を損なわない記事作成を実現。判例解説、法改正情報、Q&A形式の相談事例など、事務所の信頼性向上に直結するコンテンツを提供します。
また、相続・離婚・債務整理・企業法務など、各分野に特化した記事も対応可能。地域密着型の事務所様向けには、地域名を含めたSEO対策記事で、地元での認知度向上をサポートします。
薬機法・景表法・弁護士法などの広告規制にも完全対応。コンプライアンスを重視した記事制作で、安心してウェブマーケティングを展開できます。月間50記事以上の大量制作にも対応し、継続的な情報発信をサポートいたします。`
    },
    saas: {
        title: 'SaaS系 IT企業',
        content: `クラウドサービス、業務効率化ツール、マーケティングツール、セキュリティソフトなど、あらゆるSaaS企業向けのコンテンツマーケティングを支援します。
技術的な製品説明を、エンジニア以外の方にも理解できる分かりやすい記事に。機能紹介、導入事例、他社製品との比較、料金プラン解説など、見込み客の検討段階に応じた記事を制作します。
特に力を入れているのが、SEOを意識した「〇〇とは」記事や比較記事。これらの記事で検索上位を獲得し、認知拡大からリード獲得まで一貫してサポートします。
また、ホワイトペーパーの元となる詳細な技術解説記事や、ウェビナー後のフォローアップ記事など、マーケティング施策と連動した記事制作も可能。
API連携方法、セキュリティ対策、導入後の運用方法など、技術的な内容も専門ライターが分かりやすく解説。貴社のマーケティングチームの強力なパートナーとして、コンテンツ制作をお任せください。`
    },
    realestate: {
        title: '不動産',
        content: `不動産売買、賃貸仲介、不動産投資、リフォーム・リノベーションなど、不動産業界のあらゆる分野に対応したコンテンツを制作します。
物件紹介記事では、単なるスペック情報の羅列ではなく、そのエリアの魅力、生活利便性、将来性などを含めた訴求力の高い記事を作成。「〇〇駅 賃貸」「〇〇市 マンション」などの地域系キーワードでの上位表示実績も豊富です。
不動産投資向けには、利回り計算、節税効果、リスクとリターンなど、投資家が求める情報を網羅した記事を提供。初心者向けの基礎知識から、上級者向けの投資戦略まで幅広く対応します。
エリア情報記事では、学区情報、商業施設、交通アクセス、治安、将来の開発計画など、物件選びに重要な周辺情報を詳しく解説。
住宅ローン、税金、法律関連など、不動産取引に関わる専門的な内容も、ファイナンシャルプランナーや宅建士監修のもと、正確で分かりやすい記事を制作いたします。`
    },
    finance: {
        title: '金融・保険',
        content: `銀行、証券会社、保険会社、クレジットカード会社、FX・仮想通貨取引所など、金融業界全般のコンテンツマーケティングを支援します。
金融商品の説明記事では、複雑な仕組みを図解やシミュレーションを交えて分かりやすく解説。投資信託、NISA、iDeCo、生命保険、損害保険など、各商品の特徴とメリット・デメリットを公平に紹介します。
マーケット分析記事では、経済指標の解説、相場展望、投資戦略など、投資家が日々チェックしたくなる情報を提供。定期的な更新で、サイトへの再訪を促進します。
金融リテラシー向上のための教育コンテンツも得意分野。資産形成、ライフプランニング、リスク管理など、顧客の金融知識レベルに応じた記事を制作します。
金融商品取引法、保険業法などの規制に完全準拠。金融庁のガイドラインを踏まえた、コンプライアンス重視の記事制作で、安心してコンテンツマーケティングを展開できます。`
    },
    healthcare: {
        title: '医療・ヘルスケア',
        content: `病院、クリニック、調剤薬局、介護施設、健康食品メーカー、フィットネスジムなど、医療・ヘルスケア業界の幅広い分野に対応します。
医療機関向けには、診療科目の説明、治療法の解説、予防医学の情報など、患者様が安心して受診できる情報を提供。症状別の記事では、いつ受診すべきか、どんな検査があるか、治療期間はどれくらいかなど、患者様の不安を解消する内容を心がけています。
健康情報記事では、生活習慣病の予防、栄養管理、運動療法など、エビデンスに基づいた正確な情報を発信。医師や管理栄養士などの専門家監修も可能です。
薬機法（旧薬事法）、医療法、健康増進法などの広告規制に完全対応。「効果・効能」の表現には特に注意を払い、行政指導のリスクを回避します。
YMYL（Your Money or Your Life）領域として、Googleの品質評価ガイドラインに準拠した、E-A-T（専門性・権威性・信頼性）の高い記事を制作いたします。`
    },
    hr: {
        title: '人材・採用',
        content: `人材紹介会社、人材派遣会社、求人メディア、採用支援サービスなど、人材業界のあらゆるビジネスモデルに対応したコンテンツを制作します。
求人記事では、単なる募集要項の羅列ではなく、企業文化、キャリアパス、社員インタビューなど、求職者が本当に知りたい情報を盛り込んだ訴求力の高い内容に。職種別、業界別、地域別など、ターゲットに応じた記事制作が可能です。
転職ノウハウ記事では、履歴書・職務経歴書の書き方、面接対策、退職交渉など、転職活動の各フェーズで必要な情報を網羅。転職成功事例やキャリアアップストーリーなど、読み物としても楽しめる記事も制作します。
企業の採用担当者向けには、採用手法の解説、人材育成のノウハウ、労務管理の知識など、採用力強化に役立つ情報を提供。
労働法規、職業安定法などの法令遵守はもちろん、求職者と企業の双方にメリットのある、フェアで有益な情報発信をサポートします。`
    },
    education: {
        title: '教育・研修',
        content: `学習塾、予備校、通信教育、資格スクール、企業研修会社、オンライン学習サービスなど、教育業界全般のコンテンツマーケティングを支援します。
受験対策記事では、各教科の学習方法、過去問解説、受験スケジュール、併願戦略など、受験生と保護者が求める情報を総合的に提供。偏差値ランキングや合格体験記など、SEO効果の高い記事も得意です。
資格試験対策では、試験概要、勉強法、参考書レビュー、合格後のキャリアパスなど、資格取得を目指す方の学習をサポート。宅建、FP、簿記、ITパスポートなど、人気資格の記事制作実績が豊富です。
企業研修向けには、ビジネススキル、リーダーシップ、コミュニケーション、DXなど、現代のビジネスパーソンに必要なスキルを解説する記事を制作。
教育効果を高めるため、図解やインフォグラフィックを活用した視覚的に分かりやすい記事作成も可能。受講者の学習意欲を高め、継続的な学習を促進するコンテンツを提供します。`
    },
    beauty: {
        title: '美容・コスメ',
        content: `化粧品メーカー、美容サロン、エステサロン、美容クリニック、ネイルサロン、美容室など、美容業界のあらゆる分野に対応します。
スキンケア記事では、肌質別・年齢別・季節別のお手入れ方法、成分解説、商品レビューなど、読者のニーズに応じた記事を制作。トレンドを押さえながら、科学的根拠に基づいた信頼できる情報を提供します。
施術紹介記事では、施術内容、効果、ダウンタイム、料金相場など、お客様が施術を検討する際に必要な情報を網羅。ビフォーアフターや体験談を交えた、説得力のある記事を作成します。
美容のお悩み解決記事では、シミ、シワ、たるみ、ニキビなど、具体的な悩みに対するソリューションを提案。ホームケアから専門的な施術まで、幅広い選択肢を紹介します。
薬機法、景品表示法の規制に完全対応。「美白」「アンチエイジング」などの表現には特に注意を払い、適切な表現で効果を訴求。美容業界特有の広告規制をクリアした、安全で効果的な記事を制作します。`
    },
    manufacturing: {
        title: '製造業',
        content: `機械製造、電子部品、化学製品、食品製造、自動車部品など、製造業全般のBtoBマーケティングを支援します。
技術解説記事では、製品の仕組み、製造プロセス、品質管理、新技術の動向など、エンジニアや購買担当者が求める専門的な情報を分かりやすく解説。CAD図面や製造工程図を用いた、視覚的に理解しやすい記事も制作可能です。
導入事例記事では、製品導入による課題解決、生産性向上、コスト削減効果など、具体的な成果を数値で示す説得力のある内容に。同業他社の成功事例は、新規顧客獲得の強力なツールとなります。
業界動向記事では、市場規模、技術トレンド、規制動向、海外市場情報など、経営判断に役立つ情報を提供。展示会レポートや新製品情報など、タイムリーな情報発信も対応します。
ISO規格、JIS規格などの技術標準や、RoHS指令、REACH規則などの環境規制にも対応した記事制作が可能。製造業特有の専門用語も適切に使用し、業界関係者に信頼される記事を提供します。`
    },
    others: {
        title: 'その他多数',
        content: `飲食業、小売業、物流業、建設業、農業、スポーツ、エンターテインメントなど、上記以外のあらゆる業界にも対応いたします。
飲食業では、メニュー紹介、レシピ、食材のこだわり、店舗情報など、来店促進につながる記事を制作。グルメサイトとは違った、オウンドメディアならではの深い情報発信をサポートします。
小売業では、商品紹介、使い方ガイド、コーディネート提案、トレンド情報など、購買意欲を高める記事を提供。ECサイトとの連携で、コンテンツマーケティングから直接的な売上向上を実現します。
各業界特有の専門用語、商習慣、規制などを十分に理解した上で、ターゲットに響く記事を制作。どんなニッチな業界でも、まずはご相談ください。
400社以上の導入実績から蓄積されたノウハウを活かし、貴社の業界に最適化されたコンテンツマーケティング戦略をご提案。競合他社との差別化を図り、オンラインでの存在感を高めるお手伝いをいたします。`
    }
};

industryItems.forEach(item => {
    item.addEventListener('click', function() {
        const industry = this.getAttribute('data-industry');
        const data = industryData[industry];
        
        if (data && modal && modalTitle && modalContent) {
            modalTitle.textContent = data.title;
            modalContent.innerHTML = data.content.replace(/\n/g, '<br><br>');
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // モーダルのスクロール位置をリセット（追加部分）
            modal.scrollTop = 0;
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        }
    });
});    
    // モーダルを閉じる
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
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
    
    // 初期化完了
    console.log('SUGUKAKU LP initialized successfully');
});

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
