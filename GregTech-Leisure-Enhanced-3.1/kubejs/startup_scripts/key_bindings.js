// priority: 99
// 在客户端注册飞行速度、夜视、珍珠槽位和金刚杵速度按键。
StartupEvents.init(() => {
    // 先判断运行侧，专用服务器不会加载任何客户端按键类。
    const LDLib = Java.loadClass("com.lowdragmc.lowdraglib.LDLib")
    if (!LDLib.isClient()) return
    const KeyMapping = Java.loadClass("net.minecraft.client.KeyMapping")
    const GLFW = Java.loadClass("org.lwjgl.glfw.GLFW")
    const Registry = Java.loadClass("dev.architectury.registry.client.keymappings.KeyMappingRegistry")
    ;[
        ["flyingspeed", "X"], ["nightvision", "Z"], ["pearl", "Y"], ["vajra", "J"]
    ].forEach(([name, key]) => {
        const binding = new KeyMapping("key.kubejs." + name, GLFW["GLFW_KEY_" + key], "key.keybinding.kubejs")
        global[name + "Key"] = binding
        Registry.register(binding)
    })
})
