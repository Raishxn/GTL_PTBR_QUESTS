// 伪神之路 · 延迟重载稳健版
// 策略：命令只写 JSON，由 tick 事件在命令退出后触发原版 /reload

ServerEvents.commandRegistry(function(event) {
    var Commands = event.commands;

    event.register(
        Commands.literal('toggleGodPath')
            .requires(function(s) { return true; })
            .executes(function(ctx) {
                var current = JsonIO.read('kubejs/config/godpath.json');
                var enabled = !(current && current.enabled === true);
                JsonIO.write('kubejs/config/godpath.json', { enabled: enabled });

                var msg = enabled ? '§c开启' : '§a关闭';
                var player = ctx.source.getPlayer();
                if (player) player.tell('§6§l[伪神之路] 已切换为：' + msg + ' §e（3秒后自动重载配方）');

                Utils.server.persistentData.godPathReloadPending = true;

                return 1;
            })
    );

    event.register(
        Commands.literal('enableGodPath')
            .requires(function(s) { return true; })
            .executes(function(ctx) {
                JsonIO.write('kubejs/config/godpath.json', { enabled: true });
                var player = ctx.source.getPlayer();
                if (player) player.tell('§6§l[伪神之路] §c世界规则将在3秒后永久改写……');

                Utils.server.persistentData.godPathReloadPending = true;

                return 1;
            })
    );
});

// 延迟重载：等命令完全退出后，由 tick 事件安全触发原版 /reload
ServerEvents.tick(function(event) {
    var server = event.server;
    if (!server || !server.persistentData) return;

    var pending = server.persistentData.godPathReloadPending;
    if (!pending) return;

    var counter = server.persistentData.godPathReloadCounter || 0;
    counter = counter + 1;
    server.persistentData.godPathReloadCounter = counter;

    if (counter >= 60) {
        server.persistentData.godPathReloadPending = false;
        server.persistentData.godPathReloadCounter = 0;

        server.runCommandSilent('reload');
        console.log('[伪神之路] /reload 已执行');
    }
});