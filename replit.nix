{ pkgs }: {
  deps = [
    pkgs.gh
    pkgs.unzip
    pkgs.nodePackages.typescript-language-server
    pkgs.libuuid
  ];
}