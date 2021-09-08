{ pkgs }: {
    deps = [
    pkgs.zig
		pkgs.nodejs-16_x
		pkgs.nodePackages.typescript
		pkgs.nodePackages.npm
		pkgs.yarn
    ];
}