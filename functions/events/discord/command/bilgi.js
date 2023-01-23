// Random Message Sender
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});


// To add more answers for your command, simply add them to this list!
let messagePrompts = [
  `❗ Umut geceleri gizli gizli ağlıyor.`,
  `❗ İsmail'in takma ismi Rapunzel. Sakız kutusundaki dolarları gayet mutlu şekilde yaşıyor.`,
  `❗ Atlas aslında bir Titan'ın beden bulmuş hali insan olmayı seviyor. `,
  `❗ Dilara aslında Charly'nin çikolata fabrikasında çalışan bir cin.`,
  `❗ EliFire durduk yere sizin üzerinize bilgi sıçratabilir. Şemsiyeleriniz yanında otururken açık olsun.`,
  `❗ Nil her şeyi gören gözlere sahip. Hayvanların da ruhunu gördüğü için onları çok seviyor. *,*`,
  `❗ Şef Umut bıçaklarını çok seviyor. Her yemekten sonra bıçaklarını önce öpüyor sonra yıkıyor. Konu yemeğe gelirse 1 adım geride durmanızı öneririm fazla ciddi bir adam.`,
  `❗ Mert beyler hatırı sayılır seviyede tiyatro oyunu biliyor. İlgin varsa kesinlikle o yakışıklıyı bulmalısın.`,
  `❗ Ensar bir melek olarak doğmuştu. Kanatlarını biz çaldığımız için grafik tasarımcı oldu.`,
  `❗ Barış mağarlarda kitap okuyup zaman geçirmeyi seviyor biraz garip sanırım ama keyifli bir etkinlikmiş.`,
  `❗ Tuğba gezdiği her cm'i araştırıp planlayıp fotoğraflayıp o şekilde gezmeyi seviyor.`,
  `❗ Mete Rus edebiyatı hakkında seninle saatlerce konuşabilir.`,
  `❗ İpek saniye 1000 kare atabiliyor. Çok hızlı küfür edebiliyor. Dikkatli ol.`,
  `❗ Göknur Nevşehir'de yaşayan bir anime karakteri, erken saatlerde uyuyup gecenin derinliklerinde diğer insanları öldürmek için uyanıyor.`,
  `❗ Halil Caner bilim için serçe parmağını feda edebilirmişmişmiş.`,
  `❗ Mete bilim insanı olmayan bir mühendis.`,
  `❗ Can tam bir cancıktır. Aksini iddia eden vatan hainidir. :P`,
  
];

{
  let messageChoice = Math.floor(Math.random() * messagePrompts.length);
  let message = messagePrompts[messageChoice];
   
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `${message}`
  }); 
}