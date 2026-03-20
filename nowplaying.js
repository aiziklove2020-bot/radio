export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  try {
    const response = await fetch(
      'https://morcast.caster.fm:13763/status-json.xsl'
    );
    const data = await response.json();
    const sources = data?.icestats?.source;
    let src = Array.isArray(sources)
      ? (sources.find(s => s.listenurl?.includes('/y4k1D')) || sources[0])
      : sources;

    res.json({
      online:    !!src,
      dj:        src?.server_name || '',
      title:     src?.title       || src?.song || '',
      genre:     src?.genre       || '',
      listeners: src?.listeners   ?? 0,
    });
  } catch (err) {
    res.json({ online: false, dj: '', title: '', genre: '', listeners: 0 });
  }
}
