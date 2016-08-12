(function () {
  function bin(ip, prefix) {
    if (ip.indexOf(':') !== -1) {
      return '6' + bin6(ip, prefix);
    }

    return '4' + bin4(ip, prefix);
  }

  function bin6(ip, prefix) {
    if (typeof prefix === 'undefined') prefix = 128;
    return expand6(ip).split(':').map(binPart6).join('').slice(0, prefix);
  }

  function binPart6(x) {
    x = parseInt(x, 16).toString(2);

    while (x.length < 16) {
      x = '0' + x;
    };

    return x;
  }

  function expand6(ip) {
    var i = ip.indexOf('::');

    if (i === -1) {
      return ip;
    }

    if (i === 0) {
      ip = '0' + ip;
      i++;
    }

    if (i === ip.length - 2) {
      ip += '0';
      i++;
    }

    var zeros = [];

    for (var j = ip.match(/:/g).length; j <= 7; j++) {
      zeros.push('0');
    }

    return ip.replace('::', ':' + zeros.join(':') + ':');
  }

  function bin4(ip, prefix) {
    if (typeof prefix === 'undefined') prefix = 32;
    return ip.split('.').map(binPart4).join('').slice(0, prefix);
  }

  function binPart4(x) {
    x = parseInt(x, 10).toString(2);

    while (x.length < 8) {
      x = '0' + x;
    };

    return x;
  }

  function nice(bin) {
    if (bin[0] === '6') {
      return nice6(bin.slice(1));
    }

    return nice4(bin.slice(1));
  }

  function nice6(bin) {
    while (bin.length < 128) {
      bin += '0';
    }

    var result = [];

    for (var i = 0; i < bin.length; i += 16) {
      result.push(bin.slice(i, i + 16));
    }

    return result.map(nicePart6).join(':').replace(/(:0)+:/, '::').replace(/^0/, '').replace(/:0$/, ':');
  }

  function nicePart6(bin) {
    return parseInt(bin, 2).toString(16);
  }

  function nice4(bin) {
    while (bin.length < 32) {
      bin += '0';
    }

    var result = [];

    for (var i = 0; i < bin.length; i += 8) {
      result.push(bin.slice(i, i + 8));
    }

    return result.map(nicePart4).join('.');
  }

  function nicePart4(bin) {
    return parseInt(bin, 2).toString();
  }

  var niceIp = {
    bin,
    bin4,
    bin6,
    binPart4,
    binPart6,
    expand6,
    nice,
    nice4,
    nice6,
    nicePart4,
    nicePart6,
  };

  if (typeof window === 'undefined') {
    module.exports = niceIp;
  } else {
    window.niceIp = niceIp;
  }
})();
