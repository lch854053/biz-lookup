export default async function handler(req, res) {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST만 허용됩니다.' });
  }

  const { b_no } = req.body;

  if (!Array.isArray(b_no) || b_no.length === 0) {
    return res.status(400).json({ error: 'b_no 배열이 필요합니다.' });
  }

  if (b_no.length > 100) {
    return res.status(400).json({ error: '1회 최대 100건까지 가능합니다.' });
  }

  const apiKey = process.env.NTS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API 키가 설정되지 않았습니다. Vercel 환경변수를 확인하세요.' });
  }

  try {
    const response = await fetch(
      `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ b_no }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: `국세청 API 오류: HTTP ${response.status}`, detail: text });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: `서버 오류: ${err.message}` });
  }
}
