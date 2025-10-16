const express = require('express');
const line = require('@line/bot-sdk');
const app = express();

// ดึงค่า secret/token จาก environment
const config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

// webhook endpoint
app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    const events = req.body.events;
    for (const event of events) {
      // ถ้ามีข้อความเข้ามา
      if (event.type === 'message' && event.message.type === 'text') {
        const msg = event.message.text;

        // ตัวอย่างตอบกลับข้อความเดิม
        await client.replyMessage(event.replyToken, {
          type: 'text',
          text: `คุณพิมพ์ว่า: ${msg}`
        });
      }
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// หน้าเว็บหลัก (แค่ทดสอบ)
app.get('/', (req, res) => {
  res.send('LINE Bot is running 🚀');
});

// เริ่มเซิร์ฟเวอร์
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
