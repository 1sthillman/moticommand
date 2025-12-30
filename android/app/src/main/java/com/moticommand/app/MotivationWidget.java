package com.moticommand.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class MotivationWidget extends AppWidgetProvider {

    private static final String PREFS_NAME = "com.moticommand.app.WidgetPrefs";
    private static final String KEY_POOL = "quote_pool";

    private static final String[] QUOTES = {
            "Bazen sığınmak değil, fırtınanın kendisi olmak gerekir.|Anonim",
            "Yaranın olduğu yer, ışığın içine girdiği yerdir.|Rumi",
            "Başlamak için mükemmel olmak zorunda değilsin, ama mükemmel olmak için başlamak zorundasın.|Zig Ziglar",
            "Korku, sadece zihnin kabul ettiği bir illüzyondur.|Anonim",
            "En büyük hapishane, başkalarının ne düşündüğü korkusunun içinde yaşamaktır.|Anonim",
            "Düşmek başarısızlık değildir. Düşüp kalkamamak başarısızlıktır.|Konfüçyüs",
            "Hayat fırtınanın geçmesini beklemek değil, yağmurda dans etmeyi öğrenmektir.|Seneca",
            "Olamadığın kişi yüzünden, olduğun kişiyi cezalandırmayı bırak.|Anonim",
            "Acı, değişim için bir çağrıdır. Dinlemezsen, bağırır.|Anonim",
            "Herkes dünyayı değiştirmeyi düşünür, ama kimse kendini değiştirmeyi düşünmez.|Tolstoy",
            "Yapmadığın atışların %100'ünü kaçırırsın.|Wayne Gretzky",
            "Zorluklar, başarının süsüdür.|Moliere",
            "Sadece cesurlar affedebilir. Affetmek zayıfların özelliği değildir.|Gandhi",
            "Bir gün, geriye dönüp baktığınızda mücadele yıllarınızın en güzel yıllarınız olduğunu göreceksiniz.|Freud",
            "Kendini feda etmeyen hiç kimse, hiçbir şey kazanamaz.|Tolstoy",
            "Yarın bambaşka bir insan olacağım diyorsun. Niye bugünden başlamıyorsun?|Epiktetos",
            "Yolun ucunun nereye varacağını düşünmek beyhude bir çabadan ibarettir.|Şems-i Tebrizi",
            "Mutluluk, düşüncelerinizin, söylediklerinizin ve yaptıklarınızın uyum içinde olmasıdır.|Gandhi",
            "Ne kadar yavaş gittiğin önemli değil, yeter ki durma.|Konfüçyüs",
            "Hayatta en büyük zafer hiç düşmemek değil, her düştüğünde ayağa kalkmaktır.|Nelson Mandela",
            "Eğer cehennemden geçiyorsan, yürümeye devam et.|Winston Churchill",
            "Karanlığa küfretmektense, bir mum yakmak daha iyidir.|Konfüçyüs",
            "İmkansızla mümkün arasındaki fark, insanın kararlılığında yatar.|Tommy Lasorda",
            "Sınırlarını zorlamadıkça, yapabileceklerini asla keşfedemezsin.|Anonim",
            "Yüzünü güneşe çevirirsen, gölgeler arkanda kalır.|Walt Whitman",
            "Başarı, coşku kaybı olmadan başarısızlıktan başarısızlığa yürümektir.|Winston Churchill",
            "Hayat, senin başına gelenlerin %10'u, ona verdiğin tepkinin %90'ıdır.|Charles R. Swindoll",
            "Ağaca çıkmak istiyorsan, yıldızlara tırmanmayı hedefle.|Konfüçyüs",
            "Büyük işler, küçük işlerin defalarca yapılmasıyla başarılır.|Vincent Van Gogh",
            "Fırsatlar durup dururken gelmez, onları sen yaratırsın.|Chris Grosser",
            "Seni öldürmeyen şey güçlendirir.|Nietzsche",
            "Zafer, zafer benimdir diyebilenindir.|Atatürk",
            "Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur!|Atatürk",
            "Umutsuz durumlar yoktur, umutsuz insanlar vardır.|Atatürk",
            "Dinlenmemek üzere yola çıkanlar, asla yorulmazlar.|Atatürk",
            "Hayatta en hakiki mürşit ilimdir.|Atatürk",
            "Vatanını en çok seven, görevini en iyi yapandır.|Atatürk",
            "En karanlık gece bile sona erer ve güneş tekrar doğar.|Victor Hugo",
            "Mutluluğun anahtarı özgürlüktür, özgürlüğün anahtarı ise cesarettir.|Thucydides",
            "Hayallerinin peşinden koş, bir gün yorulup seninle yürümeye başlayacaklar.|Anonim",
            "Deniz sakin olduğunda dümeni herkes tutar.|Publilius Syrus",
            "Mazeret bulmakta usta olanlar, başka hiçbir şeyde usta olamazlar.|Benjamin Franklin",
            "Bugün yaptığınız şey, tüm yarınlarınızı iyileştirebilir.|Ralph Marston",
            "Dün zekiydim, dünyayı değiştirmek istedim. Bugün bilgeyim, kendimi değiştiriyorum.|Rumi",
            "Sabır, boyun eğmek değil, mücadele etmektir.|Hz. Ömer",
            "İnsanlar senin ne dediğini unuturlar, ama onlara ne hissettirdiğini asla unutmazlar.|Maya Angelou",
            "Bir şeyi gerçekten yapmak isterseniz bir yolunu bulursunuz.|Jim Rohn",
            "Hata yapmaktan korkan, yeni bir şey öğrenemez.|Albert Einstein",
            "Delilik, aynı şeyi tekrar tekrar yapıp farklı sonuçlar beklemektir.|Albert Einstein",
            "Hayal gücü bilgiden daha önemlidir.|Albert Einstein",
            "Hiçbir sorun, onu yaratan bilinç seviyesiyle çözülemez.|Albert Einstein",
            "Kendi ışığına güvenen, başkasının parlamasından rahatsız olmaz.|Victor Hugo",
            "En uzun yolculuklar bile tek bir adımla başlar.|Lao Tzu",
            "Sular yükselince balıklar karıncaları yer, sular çekilince de karıncalar balıkları.|Platon",
            "Kendini bil.|Sokrates",
            "Sorgulanmamış hayat, yaşamaya değmez.|Sokrates",
            "Cesaret, korkuya direnmek ve korkuya hükmetmektir.|Mark Twain",
            "Gemiler limanda güvendedir, ama gemiler bunun için yapılmamıştır.|John A. Shedd",
            "Yedinci kez düş, sekizinci kez kalk.|Japon Atasözü",
            "Durdurulamaz ol, çünkü olman gereken kişi sensin.|Anonim",
            "Şans, hazırlıkla fırsatın buluştuğu yerdir.|Seneca",
            "Bilmeyen ve bilmediğini bilen, çocuktur. Ona öğretin.|Çin Atasözü",
            "Doğa acele etmez, yine de her şeyi başarır.|Lao Tzu",
            "Başkalarını yenen kimse güçlü, kendini yenen kimse kahramandır.|Lao Tzu",
            "Akan su yosun tutmaz.|Atasözü",
            "İşleyen demir ışıldar.|Atasözü",
            "Damlaya damlaya göl olur.|Atasözü",
            "Emek olmadan yemek olmaz.|Atasözü",
            "Gülü seven dikenine katlanır.|Atasözü",
            "Meyve veren ağaç taşlanır.|Atasözü",
            "Rüzgar eken fırtına biçer.|Atasözü",
            "Zahmetsiz rahmet olmaz.|Atasözü",
            "Öfke gelir göz kararır, öfke gider yüz kızarır.|Atasözü",
            "Keskin sirke küpüne zarardır.|Atasözü",
            "Birlikten kuvvet doğar.|Atasözü",
            "Ne ekersen onu biçersin.|Atasözü",
            "Sabreden derviş muradına ermiş.|Atasözü",
            "Tatlı dil yılanı deliğinden çıkarır.|Atasözü",
            "Vakit nakittir.|Atasözü",
            "Akıl akıldan üstündür.|Atasözü",
            "Bilgi güçtür.|Francis Bacon",
            "Düşünüyorum, öyleyse varım.|Descartes",
            "En büyük zenginlik sağlıktır.|Virgil",
            "Güzellik görenin gözündedir.|Margaret Wolfe Hungerford",
            "Tarih tekerrürden ibarettir.|İbni Haldun",
            "Ya olduğun gibi görün, ya göründüğün gibi ol.|Mevlana",
            "Cahil kimsenin yanında kitap gibi sessiz ol.|Mevlana",
            "Kusur arıyorsan, tüm aynalar senin.|Mevlana",
            "Kalp deniz, dil kıyıdır. Denizde ne varsa kıyıya o vurur.|Mevlana",
            "Edep, aklın tercümanıdır.|Mevlana",
            "Cömertlik ve yardım etmede akarsu gibi ol.|Mevlana",
            "Başkalarının kusurunu örtmede gece gibi ol.|Mevlana",
            "Hiddet ve asabiyette ölü gibi ol.|Mevlana",
            "Tevazu ve alçak gönüllülükte toprak gibi ol.|Mevlana",
            "Hoşgörülülükte deniz gibi ol.|Mevlana",
            "Okumak iptiladır, müptelalara selam olsun.|Cemil Meriç",
            "Kitaplar, zekanın çocuklarıdır.|Jonathan Swift",
            "Bir kitap, içimizdeki donmuş denize indirilmiş bir baltadır.|Franz Kafka",
            "Okumayı bilirsen, her insanın bir kitap olduğunu göreceksin.|W. E. Channing",
            "Kitapsız yaşamak, kör, sağır, dilsiz yaşamaktır.|Seneca",
            "En iyi arkadaş, gerçeği söyleyen arkadaştır.|Platon",
            "Kendini aşmayan insan, sadece yerinde sayan bir hayalet gibidir.|Anonim",
            "Zorluklar seni durdurmak için değil, güçlendirmek için gelir.|Anonim",
            "Düşüncelerine dikkat et, davranışlarına dönüşür.|Lao Tzu",
            "Zeka, değişime uyum sağlayabilme yeteneğidir.|Stephen Hawking",
            "Evren seni cezalandırmıyor, seni eğitiyor. Sabırlı ol.|Anonim",
            "Bir aslan, koyunların ne düşündüğüyle ilgilenmez.|Anonim",
            "Acı geçicidir, ama pes etmek sonsuza kadar sürer.|Lance Armstrong",
            "Zirveye çıkan yol her zaman diktir, ama manzara buna değer.|Anonim",
            "Başka birinin ışığına güvenen, karanlığa mahkumdur.|Anonim",
            "Kendi hikayenin kahramanı ol, kurbanı değil.|Anonim",
            "Büyük rüyalar kuranlar, rüyalarını sadece görmezler, onları yaşarlar.|Anonim",
            "Sadelik, en yüksek gelişmişlik düzeyidir.|Leonardo da Vinci",
            "Öğrenmeyi bırakan insan yaşlanmıştır.|Henry Ford",
            "İyi olmak kolaydır, zor olan adil olmaktır.|Victor Hugo",
            "Disiplin, ne istediğin ile en çok ne istediğin arasındaki seçimdir.|Abraham Lincoln",
            "Küçük zihinler insanları, orta zihinler olayları, büyük zihinler fikirleri tartışır.|Eleanor Roosevelt",
            "Kaybedeceğini bilsen de, doğru olanı yapmaktan vazgeçme.|Anonim",
            "En büyük düşmanımız, kendi zihnimizdeki sınırlardır.|Anonim",
            "Sessizlik, bazen verilebilecek en gürültülü cevaptır.|Anonim",
            "Bir gün değil, o gün (day one, not one day).|Anonim",
            "Zayıf insanlar intikam alır, güçlü insanlar affeder, zeki insanlar umursamaz.|Albert Einstein",
            "Mutluluk gidilen bir yol değil, bir yolculuk biçimidir.|Margaret Lee Runbeck",
            "Fırtınalar insanların yeteneklerini açığa çıkarır.|Horatius",
            "Eğer rüzgar esmiyorsa, küreklere asıl.|Latin Atasözü",
            "En iyi intikam, devasa bir başarıdır.|Frank Sinatra",
            "Zamanın değerini bilmeyen, hayata hakaret ediyordur.|Anonim",
            "Sıradan bir hayat, sıradan kararların sonucudur.|Anonim",
            "Zor zamanlar güçlü insanlar yaratır.|G. Michael Hopf",
            "Gelecek, hayallerinin güzelliğine inananlarındır.|Eleanor Roosevelt",
            "Korkunun durmasına izin verme.|Anonim",
            "Düşünmek zor bir sanattır, bu yüzden çoğu insan yargılamayı tercih eder.|Carl Jung",
            "Işığını yaymak için, önce yanman gerekir.|Anonim",
            "Asla vazgeçme. Bugün zor, yarın daha da zor olacak ama öbür gün güneş doğacak.|Jack Ma",
            "Her gün bir öncekinden biraz daha iyi olmaya çalış.|Anonim",
            "Başka birinin kopya versiyonu olmaktansa, kendinin en iyi versiyonu ol.|Judy Garland",
            "Dünyayı olduğu gibi değil, olduğun gibi görürsün.|Anonim",
            "Sabır her şeyi çözmez ama sana her şeyi çözebilecek bir zihin verir.|Anonim",
            "Cesaret, korkudan ölmek üzereyken bile atını mahmuzlamaktır.|John Wayne",
            "Hayatta yapılacak en büyük hata, hata yapmaktan korkmaktır.|Elbert Hubbard",
            "Zihin paraşüt gibidir, sadece açık olduğunda çalışır.|Frank Zappa",
            "Güneşin sana gelmesini bekleme, sen güneşe git.|Anonim",
            "Her başarısızlık, daha akıllıca başlama fırsatıdır.|Henry Ford",
            "Sıradan olanı reddet, muazzam olanı kucakla.|Anonim",
            "Yarının sahibi, bugünün hazırlığını yapanlardır.|Malcolm X",
            "Yaşam kıvılcımını asla sönmesine izin verme.|Anonim",
            "Gözlerini yıldızlara dik, ayakların ise yere bassın.|Roosevelt",
            "Bir insanın değeri, başkalarına verdiği değerle ölçülür.|Anonim",
            "Bilim, organize edilmiş bilgidir. Bilgelik ise organize edilmiş hayattır.|Kant",
            "Büyük ruhlar her zaman orta zekalıların şiddetli muhalefetiyle karşılaşır.|Einstein",
            "Hayat, beklemek için çok kısa, pişmanlık duymak için ise çok uzundur.|Anonim",
            "Yetenek seni zirveye taşıyabilir ama seni orada tutacak olan karakterindir.|John Wooden",
            "Zihin her şeydir. Ne düşünürsen, o olursun.|Buda",
            "Huzur içerden gelir. Onu dışarda arama.|Buda",
            "Yürüdüğün yol ne kadar zor olursa olsun, sonunda seni bekleyen kişi sensin.|Anonim",
            "Korkuların üzerine gitmezsen, onlar senin üzerine gelir.|Anonim",
            "Zayıflık bir seçimdir, güç ise bir alışkanlık.|Anonim",
            "Sıradan bir hayat sürmek için çok özel birisin.|Anonim",
            "Başkalarının ne dediğini duymayacak kadar kendi amacına odaklan.|Anonim",
            "Eğer bir hedef seni korkutmuyorsa, yeterince büyük değildir.|Anonim",
            "Sınırlarını zorlamak, sınırlarını genişletmektir.|Anonim",
            "Zamanın akışına kapılma, zamanı akan bir nehir gibi sen yönet.|Anonim",
            "Kendine inanmak, başarının yarısıdır.|Anonim",
            "Karakter, kimsenin bakmadığı anlarda ne yaptığındır.|Anonim",
            "Gelecek bugün ne yaptığınla şekillenir.|Anonim",
            "Zorluklar seni rayından çıkarmaz, rayları senin için temizler.|Anonim",
            "Öğrenmek bir hazinedir, peşinden git.|Anonim",
            "Zihnini eğit, bedenin onu takip edecektir.|Anonim",
            "Hayallerin için savaş, çünkü kimse senin yerine savaşmayacak.|Anonim",
            "Her gün yeni bir fırsattır, onu israf etme.|Anonim",
            "Başka birinin senin hakkında ne düşündüğü, senin kaderin değildir.|Les Brown",
            "Eğer uçamıyorsan koş, koşamıyorsan yürü, yürüyemiyorsan sürün ama ilerlemeye devam et.|King Jr.",
            "İmkanın sınırını görmek için, imkansızı denemek lazım.|Fatih Sultan Mehmet",
            "Hayat kısa, kuşlar uçuyor.|Cemal Süreya",
            "Ateş karşısında bozulmayan altın, altın karşısında bozulmayan kadın kalitelidir.|Gorki",
            "Mutlu olmayı yarına bırakmak, karşıya geçmek için nehrin durmasını beklemeye benzer.|Anonim",
            "Yaşam kıvılcımını asla söndürme.|Anonim",
            "Fırsatlar çıkmadığında, bir kapı inşa et.|Milton Berle",
            "Sıradışı sonuçlar için sıradışı çabalar gerekir.|Anonim",
            "Zihnini kısıtlayan tek şey, yine senin zihnindir.|Anonim",
            "Her sabah yeni bir hayat başlar.|Anonim",
            "Kendini keşfetmek, dünyayı değiştirmektir.|Anonim",
            "Bugün tohum ekmezsen, yarın hasat bekleyemezsin.|Anonim",
            "Cesaret, korkudan vazgeçmek değil, korkuya rağmen devam etmektir.|Anonim",
            "Hayat bir yankıdır. Ne verirsen onu alırsın.|Anonim",
            "Büyük nehirler küçük derelerden doğar.|Anonim",
            "Kendini her gün %1 geliştirirsen, bir yılın sonunda devasa bir değişim yaşarsın.|Anonim",
            "Sessizlik içinde çalış, başarı gürültün olsun.|Anonim",
            "Başkalarının başarısı seni tetiklesin, kıskandırmasın.|Anonim",
            "Zor zamanlar geçecek, ama zorlu insanlar kalacak.|Anonim",
            "Herkesin geçtiği yoldan gidenler, herkesin vardığı yere varırlar.|Anonim",
            "Yıldızlara ulaşmak için önce ayağa kalkmalısın.|Anonim",
            "Geleceğini tahmin etmenin en iyi yolu, onu yaratmaktır.|Lincoln",
            "Disiplin, özgürlüğün anahtarıdır.|Anonim",
            "Odaklanmak, hayır demeyi öğrenmektir.|Steve Jobs",
            "Zamanın kısıtlı, bu yüzden onu başkasının hayatını yaşayarak harcama.|Steve Jobs",
            "Aç kal, budala kal.|Steve Jobs",
            "Mükemmeliyetçilik ilerlemenin düşmanıdır.|Anonim",
            "Acı geçer ama asalet kalır.|Anonim",
            "Cesurlar bir kez ölür, korkaklar bin kez.|Shakespeare",
            "Karakterin kaderindir.|Herakleitos",
            "Aynı nehirde iki kez yıkanılmaz.|Herakleitos",
            "Güneş her gün yenidir.|Herakleitos",
            "Zorluklar karakteri ortaya çıkarır.|Epiktetos",
            "Sadece eğitimli olanlar özgürdür.|Epiktetos",
            "Seni rahatsız eden olaylar değil, o olaylar hakkındaki düşüncelerindir.|Epiktetos",
            "Kontrol edemediğin şeyleri dert etmeyi bırak.|Epiktetos",
            "Zenginlik, çok şeye sahip olmak değil, az şeye ihtiyaç duymaktır.|Epiktetos",
            "Huzuru kendi içinde bulamazsan, başka yerde bulman imkansızdır.|Marcus Aurelius",
            "Hayatının kalitesini düşüncelerinin kalitesi belirler.|Marcus Aurelius",
            "Sana yapılan kötülüğe verilecek en iyi cevap, onun gibi olmamaktır.|Marcus Aurelius",
            "Ölümden değil, hiç yaşamamış olmaktan kork.|Marcus Aurelius",
            "İnsan ruhu, boyandığı düşüncelerin rengini alır.|Marcus Aurelius",
            "Evren değişimdir; hayat ise senin kanılarındır.|Marcus Aurelius",
            "Dışardan gelen bir şey seni üzüyorsa, bunu her an ortadan kaldırabilirsin.|Marcus Aurelius",
            "İyi bir insan nasıl olmalı diye tartışmayı bırak, öyle bir insan ol!|Marcus Aurelius",
            "Güç, zihndedir.|Anonim",
            "Her zorlukta bir kolaylık vardır.|İnşirah",
            "Damla damla biriken, okyanus olur.|Anonim",
            "Kendi geminin kaptanı ol.|Anonim",
            "Hayallerinin peşinden git, onlar yolu biliyor.|Anonim",
            "Sorgula, öğren, uygula.|Anonim",
            "Bilgelik sessizdir.|Anonim",
            "Her günün bir ödül olduğunu unutma.|Anonim",
            "Kendini asla küçümseme; bir tohum koskoca bir ormanın başlangıcıdır.|Anonim",
            "Durdurulamaz olmak bir tercihtir.|Anonim",
            "Hayat bir maratondur, sprint değil.|Anonim",
            "Sürekli öğrenenler dünyayı fetheder.|Anonim"
    };

    private static final String ACTION_AUTO_UPDATE = "com.moticommand.app.ACTION_AUTO_UPDATE";
    private static final String ACTION_REFRESH = "com.moticommand.app.ACTION_REFRESH";

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        String quoteLine = getNextQuote(context);
        String[] parts = quoteLine.split("\\|");
        String quote = parts[0];
        String author = parts.length > 1 ? "— " + parts[1] : "";

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.motivation_widget);
        views.setTextViewText(R.id.widget_quote_text, "\"" + quote + "\"");
        views.setTextViewText(R.id.widget_author_text, author);

        // Manual Refresh Button
        Intent intent = new Intent(context, MotivationWidget.class);
        intent.setAction(ACTION_REFRESH);
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, new int[] { appWidgetId });
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, appWidgetId, intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_refresh_button, pendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    private static String getNextQuote(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String poolStr = prefs.getString(KEY_POOL, "");
        List<Integer> pool = new ArrayList<>();

        if (!poolStr.isEmpty()) {
            String[] items = poolStr.split(",");
            for (String item : items) {
                if (!item.isEmpty())
                    pool.add(Integer.parseInt(item));
            }
        }

        if (pool.isEmpty()) {
            // Refill and shuffle
            for (int i = 0; i < QUOTES.length; i++)
                pool.add(i);
            Collections.shuffle(pool);
        }

        int nextIndex = pool.remove(0);

        // Save back
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < pool.size(); i++) {
            sb.append(pool.get(i));
            if (i < pool.size() - 1)
                sb.append(",");
        }
        prefs.edit().putString(KEY_POOL, sb.toString()).apply();

        return QUOTES[nextIndex];
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        super.onEnabled(context);
        startAlarm(context);
    }

    @Override
    public void onDisabled(Context context) {
        super.onDisabled(context);
        stopAlarm(context);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (ACTION_REFRESH.equals(intent.getAction()) || ACTION_AUTO_UPDATE.equals(intent.getAction())) {
            ComponentName thisAppWidget = new ComponentName(context.getPackageName(), MotivationWidget.class.getName());
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisAppWidget);
            for (int appWidgetId : appWidgetIds) {
                updateAppWidget(context, appWidgetManager, appWidgetId);
            }
        }
    }

    private void startAlarm(Context context) {
        android.app.AlarmManager alarmManager = (android.app.AlarmManager) context
                .getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, MotivationWidget.class);
        intent.setAction(ACTION_AUTO_UPDATE);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        // 35 Seconds Interval
        long interval = 35000;
        alarmManager.setRepeating(android.app.AlarmManager.RTC, System.currentTimeMillis(), interval, pendingIntent);
    }

    private void stopAlarm(Context context) {
        android.app.AlarmManager alarmManager = (android.app.AlarmManager) context
                .getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, MotivationWidget.class);
        intent.setAction(ACTION_AUTO_UPDATE);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        alarmManager.cancel(pendingIntent);
    }
}
