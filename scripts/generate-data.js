const fs = require('fs');
const path = require('path');

const categories = [
    { id: 'kurumsal', name: 'Kurumsal Hayat', symbol: '🏢', description: 'Plazaların soğuk gerçekleri' },
    { id: 'iliskiler', name: 'Modern İlişkiler', symbol: '💔', description: 'Dijital çağda bağ kurmak' },
    { id: 'aile', name: 'Aile Dinamikleri', symbol: '🏠', description: 'Kan bağının ağırlığı' },
    { id: 'kariyer', name: 'Kariyer ve Başarı', symbol: '📈', description: 'Tırmanılan merdivenler' },
    { id: 'varolus', name: 'Varoluşsal', symbol: '🌌', description: 'Benlik ve anlam arayışı' },
    { id: 'para', name: 'Para ve Güç', symbol: '💰', description: 'Maddiyatın illüzyonu' },
    { id: 'sosyal', name: 'Sosyal Maskeler', symbol: '🎭', description: 'Başkaları ne der?' },
    { id: 'teknoloji', name: 'Dijital Tutsaklık', symbol: '📱', description: 'Ekranların ardındaki yaşam' },
    { id: 'saglik', name: 'Beden ve Zihin', symbol: '🧠', description: 'Yıpranan mekanizma' },
    { id: 'kayip', name: 'Yas ve Kayıp', symbol: '🕯️', description: 'Vedaların öğretisi' }
];

const templates = [
    {
        title: "{subject} ile karşılaştığında",
        steps: [
            "Önce {step1} sanırsın.",
            "Herkesin {step2} olduğunu düşünürsün.",
            "Zamanla {step3} fark edersin.",
            "Asıl gerçeğin {conclusion} olduğunu anlarsın."
        ]
    },
    {
        title: "{subject} hakkında bilinmeyenler",
        steps: [
            "{step1} en büyük yalandır.",
            "İnsanlar {step2} için bunu yapar.",
            "Sessizce {step3} beklersin.",
            "{conclusion}."
        ]
    },
    {
        title: "{subject} sürecinde yapılan hatalar",
        steps: [
            "Hemen {step1} istersin.",
            "Sabretmek yerine {step2} denersin.",
            "Kaybettiğinde {step3} suçlarsın.",
            "Kazananlar ise sadece {conclusion} yapmıştır."
        ]
    }
];

const subjects = {
    kurumsal: ['Terfi', 'Mobbing', 'Toplantı', 'İstifa', 'Yıllık İzin', 'Performans Görüşmesi', 'Açık Ofis', 'Maaş Zammı', 'Ekip Yemeği', 'Pazartesi Sendromu'],
    iliskiler: ['Ghosting', 'İlk Buluşma', 'Ayrılık', 'Evlilik', 'Aldatma', 'Uzun Mesafe', 'Flört', 'Kıskançlık', 'Bağlanma Korkusu', 'Eski Sevgili'],
    aile: ['Bayram Ziyareti', 'Miras Kavgası', 'Kuşak Çatışması', 'Anne Yemeği', 'Baba Nasihatı', 'Kardeş Kıskançlığı', 'Düğün Hazırlığı', 'Cenaze', 'Sır Tutma'],
    kariyer: ['İş Görüşmesi', 'Girişimcilik', 'İflas', 'Network', 'Mentorluk', 'Emeklilik', 'Meslek Seçimi', 'Yurtdışı Hayali', 'Freelance Yaşam'],
    varolus: ['Yalnızlık', 'Ölüm Korkusu', 'Anlam Arayışı', 'Geçmiş Pismanlıklar', 'Gelecek Kaygısı', 'Uykusuzluk', 'Boşluk Hissi', 'Yaşlanmak', 'Değişim'],
    para: ['Yatırım', 'Borç', 'Kredi Kartı', 'Piyango', 'Miras', 'Cimrilik', 'Gösteriş', 'İflas', 'Zenginlik'],
    sosyal: ['Dedikodu', 'Düğünler', 'Partiler', 'Sosyal Medya', 'Popülerlik', 'Dışlanma', 'Misafirlik', 'Yargılanma', 'İmaj'],
    teknoloji: ['Bildirimler', 'Like Bağımlılığı', 'Stalking', 'Influencerlar', 'Sanal Gerçeklik', 'Yapay Zeka', 'Veri Gizliliği', 'Dijital Detoks'],
    saglik: ['Tükenmişlik', 'Panik Atak', 'Uykusuzluk', 'Diyet', 'Spor Salonu', 'Hastalık', 'Yaşlılık', 'Estetik', 'Meditasyon'],
    kayip: ['Veda', 'Anılar', 'Eşyalar', 'Fotoğraflar', 'Mezarlık', 'Unutulmak', 'Yarım Kalanlar', 'Son Sözler']
};

const phrases = {
    step1: ['dünyanın sonu', 'sonsuz mutluluk', 'kolay bir yol', 'adil bir sistem', 'herkesin dost', 'para ile çözülür', 'kaçınılmaz', 'anlamsız'],
    step2: ['seni izlediğini', 'seni yargıladığını', 'seni sevdiğini', 'seni kıskandığını', 'yardım edeceğini', 'engel olacağını'],
    step3: ['kendinden ödün verdiğini', 'boşa kürek çektiğini', 'gözünün kör olduğunu', 'fırsatları kaçırdığını', 'zamanın geçtiğini'],
    conclusion: ['vazgeçmektir', 'kabul etmektir', 'sessiz kalmaktır', 'yola devam etmektir', 'kendini sevmektir', 'hayır demektir', 'affetmektir']
};

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateInstructions() {
    const instructions = [];
    let idCounter = 1;

    categories.forEach(category => {
        // Generate ~100 items per category
        for (let i = 0; i < 120; i++) {
            const template = getRandom(templates);
            const subject = getRandom(subjects[category.id]);

            let title = template.title.replace('{subject}', subject);
            let steps = template.steps.map(step =>
                step.replace('{step1}', getRandom(phrases.step1))
                    .replace('{step2}', getRandom(phrases.step2))
                    .replace('{step3}', getRandom(phrases.step3))
                    .replace('{conclusion}', getRandom(phrases.conclusion))
            );

            instructions.push({
                id: `${category.id}-${idCounter++}`,
                category: category.id,
                title: title,
                ageRange: `${Math.floor(Math.random() * 50 + 18)}-${Math.floor(Math.random() * 20 + 50)}`,
                steps: steps,
                experienced: Math.floor(Math.random() * 1000),
                lateLearned: Math.floor(Math.random() * 800),
                stillLearning: Math.floor(Math.random() * 500)
            });
        }
    });

    return instructions;
}

const data = {
    categories: categories,
    instructions: generateInstructions(),
    contradictions: [] // Omitted for brevity, can populate similar to instructions if needed
};

fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(data, null, 2));
console.log(`Generated ${data.instructions.length} instructions.`);
