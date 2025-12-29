package com.moticommand.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

import java.util.Random;

public class MotivationWidget extends AppWidgetProvider {

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
            "Şans, hazırlıkla fırsatın buluştuğu yerdir.|Seneca",
            "Yolun ucunun nereye varacağını düşünmek beyhude bir çabadan ibarettir.|Şems-i Tebrizi",
            "Mutluluk, düşüncelerinizin, söylediklerinizin ve yaptıklarınızın uyum içinde olmasıdır.|Gandhi",
            "Ne kadar yavaş gittiğin önemli değil, yeter ki durma.|Konfüçyüs",
            "Hayatta en büyük zafer hiç düşmemek değil, her düştüğünde ayağa kalkmaktır.|Nelson Mandela",
            "Eğer cehennemden geçiyorsan, yürümeye devam et.|Winston Churchill",
            "Karanlığa küfretmektense, bir mum yakmak daha iyidir.|Konfüçyüs",
            "İmkansızla mümkün arasındaki fark, insanın kararlılığında yatar.|Tommy Lasorda",
            "Sınırlarını zorlamadıkça, yapabileceklerini asla keşfedemezsin.|Anonim",
            "Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur!|Mustafa Kemal Atatürk",
            "Umutsuz durumlar yoktur, umutsuz insanlar vardır.|Mustafa Kemal Atatürk",
            "Dinlenmemek üzere yola çıkanlar, asla yorulmazlar.|Mustafa Kemal Atatürk",
            "Hayatta en hakiki mürşit ilimdir.|Mustafa Kemal Atatürk",
            "Zafer, zafer benimdir diyebilenindir.|Mustafa Kemal Atatürk",
            "Kendini bil.|Sokrates",
            "Sorgulanmamış hayat, yaşamaya değmez.|Sokrates",
            "Cesaret, korkuya direnmek ve korkuya hükmetmektir.|Mark Twain",
            "Durdurulamaz ol, çünkü olman gereken kişi sensin.|Anonim"
    };

    private static final String ACTION_AUTO_UPDATE = "com.moticommand.app.ACTION_AUTO_UPDATE";
    private static final String ACTION_REFRESH = "com.moticommand.app.ACTION_REFRESH";

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        String[] parts = QUOTES[new Random().nextInt(QUOTES.length)].split("\\|");
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
