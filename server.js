const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 9898;

app.get('/api/lcmd5', async (_req, res) => {
  try {
    const response = await axios.get('https://wtxmd52.tele68.com/v1/txmd5/sessions', { timeout: 10000 });
    const data = response.data;
    const sessions = data.list || data;
    if (!Array.isArray(sessions) || sessions.length === 0) {
      return res.status(404).json({ success: false, message: 'Không có dữ liệu phiên' });
    }
    sessions.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
    const latest = sessions[0];
    const dice = latest.dices || [0, 0, 0];
    res.json({
      success: true,
      data: {
        ket_qua: latest.resultTruyenThong || '',
        phien: latest.id || latest._id || '',
        thoi_gian: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
        tong: latest.point || dice.reduce((a, b) => a + Number(b || 0), 0),
        xuc_xac_1: dice[0] || 0,
        xuc_xac_2: dice[1] || 0,
        xuc_xac_3: dice[2] || 0
      }
    });
  } catch (error) {
    console.error('Lỗi gọi API:', error.message);
    res.status(502).json({ success: false, message: 'Không lấy được dữ liệu từ API nguồn' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(port, () => console.log(`TX Insight AI chạy tại http://localhost:${port}`));
