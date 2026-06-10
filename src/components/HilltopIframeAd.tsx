import React from 'react';

const adScript = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; min-height:100px; background:transparent;">
  <div>
    <script>
      (function(bdz){
        var d = document,
            s = d.createElement('script'),
            l = d.scripts[d.scripts.length - 1];
        s.settings = bdz || {};
        s.src = "//shameful-farm.com/bGXNVPsMd.GllH0WYbW-cP/Je/my9duiZ-UClakCPlTkcaxaMsjmQS1UO-DNkCtYNbz/E/yjNUDmUj5/MVwK";
        s.async = true;
        s.referrerPolicy = 'no-referrer-when-downgrade';
        l.parentNode.insertBefore(s, l);
      })({})
    <\/script>
  </div>
</body>
</html>
`;

const HilltopIframeAd: React.FC = () => {
  return (
    <iframe
      srcDoc={adScript}
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
      width="100%"
      height="100"
      style={{
        border: 'none',
        margin: '0 auto 16px auto',
        display: 'block',
        maxWidth: '360px',
      }}
      title="Advertisement"
    />
  );
};

export default HilltopIframeAd;