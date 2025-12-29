const fs = require('fs');
const path = require('path');

const categories = [
    { id: "kaybetmek", name: "Kaybetmek", symbol: "💔", description: "Bir şeyin sonunu kabul etmek, yıkımın tam ortasında ayakta kalmak." },
    { id: "beklemek", name: "Beklemek", symbol: "⏳", description: "Zamanın işi bitirmesine izin vermek, aceleciliğin cevabı olmadığını anlamak." },
    { id: "basarisizlik", name: "Başarısız Olmak", symbol: "⚡", description: "Planların çökerken, yeni bir gerçekliğin kapılarını aralamak." },
    { id: "vazgecmek", name: "Vazgeçmek", symbol: "🍂", description: "Bırakmanın gücünü keşfetmek, sahip olmayı bırakınca kazanmak." },
    { id: "yalnizlik", name: "Yalnız Kalmak", symbol: "🌑", description: "Kendi sessizliğinle yüzleşmek, içindeki boşlukları doldurmayı öğrenmek." },
    { id: "gucluluk", name: "Güçlü Görünmek", symbol: "🛡️", description: "Zaafını gizlerken, kalkanının arkasında ne kaybettiğini fark etmek." },
    { id: "hassasiyet", name: "Hassas Olmak", symbol: "🌸", description: "Kırılganlığını kabul etmek, incinmenin insan olmanın kanıtı olduğunu anlamak." },
    { id: "para", name: "Para Kazanmak", symbol: "⚖️", description: "Ekonomik gerçeklikle yüzleşmek, parayla ölçülemeyen şeylerin değerini keşfetmek." },
    { id: "kariyer", name: "Kariyer İnşası", symbol: "climb", description: "Tırmanılan merdivenlerin nereye dayandığını sorgulamak." },
    { id: "aile", name: "Aile Bağları", symbol: "house", description: "Köklerin seni beslediği mi yoksa zehirlediği mi yer?" }
];

const templates = {
    kaybetmek: [
        {
            title: "{subject} bittiğini anladığında",
            steps: [
                "Önce inkâr edersin. {denial}",
                "Sonra suçu kendinde ararsın. {blame}",
                "Sessizlik gelir. {silence}",
                "Sonra uyanırsın. Yeni bir güne, eski bir sen olmadan."
            ],
            warning: "Kaybetmek, eksilmek değildir. Bırakmaktır arkanda ne kaldığını görmek."
        },
        {
            title: "{subject} artık senin olmadığını fark ettiğinde",
            steps: [
                "Sahiplenmek istersin. Sanki {clinging} gibi.",
                "Ama ellerinin arasından kayıp gider.",
                "Gidenin ardından bakmak zordur.",
                "Giden gitmiştir, kalan ise eksik değil, sadedir."
            ],
            warning: "Sahip olduğun tek şey, şu an aldığın nefestir."
        }
    ],
    beklemek: [
        {
            title: "{subject} için doğru zamanı beklerken",
            steps: [
                "Sabırsızdır gece. {impatience}",
                "Zaman geçmek bilmez. {time_slow}",
                "Bir gün vazgeçersin beklemekten.",
                "O an gelir beklenen. Ama sen değişmişsindir."
            ],
            warning: "Beklemek eylemsizlik değildir. Beklerken kim olduğuna dikkat et."
        }
    ],
    // ... adding generic templates that adapt to subjects
};

const subjects = {
    kaybetmek: ["Bir ilişkinin", "Gençliğinin", "Bir dostun", "Bir fırsatın", "Sağlığının", "Masumiyetin", "İnancının", "Hevesinin", "Evinin", "Memleketinin", "Eski neşenin", "Babanın", "Annenin", "Sevgilinin", "Hayallerinin", "Umudunun", "Cesaretinin", "Zamanın", "Yeteneklerinin", "Hafızanın"],
    beklemek: ["Terfi", "Mezuniyet", "Emeklilik", "Haber", "Mesaj", "Af", "Adalet", "İyileşme", "Bayram", "Haftasonu", "Yaz", "Kış", "Ölüm", "Doğum", "Aşk", "İlham", "Para", "Onay", "Takdir", "Anlaşılma"],
    basarisizlik: ["Sınavda", "Mülakatta", "Projende", "Evliliğinde", "Yatırımda", "Diyetinde", "Sunumda", "Sanatında", "Sporunda", "Liderliğinde", "Ebeveynlikte", "Arkadaşlıkta", "Ticarette", "Kodlamada", "Yazmada", "Konuşmada", "Tartışmada", "Pazarlıkta", "Tamirde", "Yetenekte"],
    vazgecmek: ["Sigaradan", "Alkol", "Takıntıdan", "Eski sevgiliden", "Kinden", "Nefretten", "Haklı olmaktan", "Kazanmaktan", "Şehirden", "İşten", "Okuldan", "Giyimden", "Tarzdan", "İdeallerinden", "Sözünden", "Yeminden", "Prensibinden", "Alışkanlıktan", "Konfordan", "Güvenlikten"],
    yalnizlik: ["Kalabalıkta", "Evde", "Ofiste", "Okulda", "Yatakta", "Yolda", "Tatil", "Parti", "Düğün", "Cenaze", "Hastane", "Sinema", "Konser", "Orman", "Deniz", "Dağ", "Karanlık", "Aydınlık", "Sessizlik", "Gürültü"],
    gucluluk: ["Ağlarken", "Korkarken", "Üzülürken", "Yorulurken", "Hastayken", "Kırılırken", "Düşerken", "Yenilirken", "Kaçarken", "Saklanırken", "Utanırken", "Kıskanırken", "Özlerken", "Severken", "Nefret ederken", "Bağırırken", "Susarken", "Titrerken", "Kanarken", "Ölürken"],
    hassasiyet: ["Eleştirildiğinde", "Reddedildiğinde", "Unutulduğunda", "Aldatıldığında", "Kandırıldığında", "Kovulduğunda", "Azarlandığında", "Gülündüğünde", "Bakıldığında", "Dokunulduğunda", "Sevildiğinde", "Övüldüğünde", "Seçildiğinde", "Dışlandığında", "Susturulduğunda", "Bağırıldığında", "İtildiğinde", "Çekildiğinde", "Vurulduğunda", "Öpüldüğünde"],
    para: ["Harcarken", "Biriktirirken", "Sayarken", "Borçlanırken", "Öderken", "İsterken", "Verirken", "Kaybederken", "Bulurken", "Çalarken", "Saklarken", "Yatırırken", "Çekerken", "Biterken", "Artarken", "Bölüşürken", "Kıskanırken", "Gizlerken", "Gösterirken", "Yakarken"],
    kariyer: ["Başlarken", "Yükselirken", "Düşerken", "Değiştirirken", "Bırakırken", "Ararken", "Bulurken", "Seçerken", "Reddederken", "Kovulurken", "Terfi ederken", "Zam alırken", "İstifa ederken", "Emekli olurken", "Batarken", "Çıkarken", "Satarken", "Alırken", "Yönetirken", "Yönetilirken"],
    aile: ["Doğarken", "Büyürken", "Evlenirken", "Boşanırken", "Ölürken", "Taşınırken", "Kavga ederken", "Barışırken", "Ayrılırken", "Kavuşurken", "Beklerken", "Giderken", "Kalırken", "Susarken", "Konuşurken", "Yerken", "İçerken", "Uyurken", "Uyanırken", "Yaşarken"]
};

const fillers = {
    denial: ["'Daha düzelebilir' dersin.", "'Bu bir rüya' dersin.", "'Yanlış anlaşılma' dersin."],
    blame: ["'Ben daha çok çabalasaydım' dersin.", "'Keşke konuşsaydım' dersin.", "'Neden görmedim?' dersin."],
    silence: ["Karşı tarafın cevap vermediği bir sessizlik.", "Duvarların konuştuğu bir sessizlik.", "Telefonun çalmadığı bir sessizlik."],
    clinging: ["boğulur", "kırılır", "tükenir"],
    impatience: ["Saniye yıl olur.", "Nefes dar gelir.", "Göz uyku tutmaz."],
    time_slow: ["Saatler donar.", "Takvim yaprakları yapışır.", "Güneş doğmaz."]
};

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateData() {
    const instructions = [];
    let idCounter = 1;

    categories.forEach(cat => {
        // Generate ~25 items per category
        const catSubjects = subjects[cat.id] || subjects["kaybetmek"]; // fallback

        catSubjects.forEach(sub => {
            // Deep copy a random template
            const template = getRandom(templates[cat.id] || templates["kaybetmek"]);

            let title = template.title.replace("{subject}", sub);
            let steps = template.steps.map(s =>
                s.replace("{subject}", sub)
                    .replace("{denial}", getRandom(fillers.denial))
                    .replace("{blame}", getRandom(fillers.blame))
                    .replace("{silence}", getRandom(fillers.silence))
                    .replace("{clinging}", getRandom(fillers.clinging))
                    .replace("{impatience}", getRandom(fillers.impatience))
                    .replace("{time_slow}", getRandom(fillers.time_slow))
            );

            instructions.push({
                id: `${cat.id}-${idCounter++}`,
                category: cat.id,
                title: title,
                ageRange: `${Math.floor(Math.random() * 20 + 18)}-${Math.floor(Math.random() * 40 + 30)}`,
                steps: steps,
                experienced: Math.floor(Math.random() * 1000 + 50),
                lateLearned: Math.floor(Math.random() * 800 + 20),
                stillLearning: Math.floor(Math.random() * 500 + 10),
                warning: template.warning
            });
        });
    });

    return instructions;
}

const db = {
    categories: categories,
    instructions: generateData(),
    contradictions: []
};

fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(db, null, 2));
console.log(`Generated ${db.instructions.length} premium contents.`);
