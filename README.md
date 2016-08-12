# nice-ip

IP library for JS. Convert IPv4 and IPv6 into prefixed binary strings and
deserialize them later.

```javascript
var ip = require('nice-ip');

var x = ip.bin('127.0.0.1', 8); // -> '401111111'
ip.nice(x); // -> '127.0.0.0'

var y = niceIp.bin('::1'); // -> '60' ... '01'
ip.nice(y); // -> '::1'
```
