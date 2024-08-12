{ pkgs, lib, config, ... }:
{
  dotenv.enable = true;
  packages = [
    pkgs.git
    pkgs.nodejs_20
    pkgs.nodePackages.pnpm
    pkgs.temporal
    pkgs.fzf
  ];

  services.temporal = {
    enable = true;
  };

  services.temporal.ui = {
    enable = true;
  };

  services.temporal.state = {
    ephemeral = true;
  };

  scripts = {
    dev.exec = ''
      ./tools/scripts/dev.sh ${config.devenv.runtime}/pc.sock "$@"
    '';
    pn.exec = ''
      pnpm "$@"
    '';
  };

  enterShell = ''
    echo "node: $(node -v)"
    echo "npm: $(npm -v)"
    echo "pnpm: $(pnpm -v)"
    chmod +x ./tools/scripts/*
  '';

  process-managers.process-compose.enable = true;
  processes = {
    web = {
      exec = "pnpm -F web dev";
    };
    backend = {
      exec = "pnpm -F backend dev";
    };
    worker = {
      exec = "pnpm -F worker dev";
    };
  };
}
