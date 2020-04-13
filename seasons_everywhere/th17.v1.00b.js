{
    "COMMENT": "This file is autogenerated.  Please do not edit it directly.  See the convert-yaml.py script.",
    "binhacks": {
        "Season items go in PIV item array": {
            "addr": "0x0043476d",
            "expected": "83FF 09 0F84 95020000 // 83FF 0A 0F84 8C020000 // 83FF 0B 0F84 83020000 // 83FF 0C 0F84 7A020000",
            "code": "83FF 09 // 7C 31 // 90909090 // 83FF 0f // 0F8E 8C020000 // 83FF 30 // 0F84 83020000 // EB 19 // CCCCCC // CCCCCCCC"
        },
        "Set season item ANM script": {
            "addr": "0x004334b3",
            "expected": "C787 580C0000 02000000 // FF 34 C5 A80D4A00",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.item-anm-script] // 0F1F440000 // 0F1F8000000000"
        },
        "Season items on graze": {
            "addr": "0x0044a0dc",
            "expected": "5f // 5e // 8be5 // 5d",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.item-on-graze]"
        },
        "Season item flyout state implementation": {
            "addr": "0x0043386d",
            "expected": "83F8 03 // 74 B1",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.item-flyout-state]"
        },
        "Season item in flyout state cannot be attracted": {
            "addr": "0x433fd7",
            "expected": "83f804 // 0f84b8000000 // 83f803 // 0f84af000000",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.item-noattract] // CCCCCCCC // CCCCCC // CCCCCCCCCCCC"
        },
        "Season item pickup effect": {
            "addr": "0x433b2d",
            "expected": "8d41ff // 83f80d",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.item-pickup-effect] // CC"
        },
        "Season release autocollects items in Falling state": {
            "addr": "0x433590",
            "expected": "a1 88764b00",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.autocollect-state-1]"
        },
        "Season release autocollects items in Attracted state": {
            "addr": "0x4338b3",
            "expected": "a1 88764b00",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.autocollect-state-4]"
        },
        "Use season release bullet cancel mode": {
            "addr": "0x425c9f",
            "expected": "6a01 // 8bcf // f30f1185 98fbffff",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.use-release-cancel-mode] // CCCCCC CCCCCCCC"
        },
        "Implement season bullet cancel modes": {
            "addr": "0x419c9c",
            "expected": "83fa01 // 7544",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.impl-cancel-modes]"
        },
        "Allocate season data for enemies": {
            "addr": "0x41ed32",
            "expected": "8b8190000000",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.allocate-enemy-exes] // CC"
        },
        "Free season data for enemies": {
            "addr": "0x41db7a",
            "expected": "8b8690520000",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.deallocate-enemy-exes] // CC"
        },
        "Enemies can drop season items": {
            "addr": "0x41da35",
            "expected": "6888000000",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.drop-season-items]"
        }
    },
    "codecaves": {
        "protection": 64,
        "ExpHP.seasons-everywhere.global-var-store": "00000000 // 00000000 // 00000000 // 00000000 // ",
        "ExpHP.seasons-everywhere.new-enemy-ex": "55 // 89E5 // 56 // 57 // 6A3C // E8 [codecave:ExpHP.seasons-everywhere.calloc] // 89C7 // BE <codecave:ExpHP.seasons-everywhere.global-var-store> // 8D0E // 51 // 89F9 // E8 [codecave:ExpHP.seasons-everywhere.zunlist-insert-after] // 8B4508 // 894710 // C747340A000000 // C7473801000000 // C747303C000000 // 8D4F1C // 6A3C // B8C05B4000 // FFD0 // 89F8 // 5F // 5E // 89EC // 5D // C20400",
        "ExpHP.seasons-everywhere.free-enemy-ex-by-id": "55 // 89E5 // 8B4508 // 50 // E8 [codecave:ExpHP.seasons-everywhere.find-enemy-ex-by-id] // 89C1 // E8 [codecave:ExpHP.seasons-everywhere.zunlist-remove-node] // 6A3C // 50 // B880B24700 // FFD0 // 89EC // 5D // C20400",
        "ExpHP.seasons-everywhere.find-enemy-ex-by-id": "B9 <codecave:ExpHP.seasons-everywhere.global-var-store> // 8D09 // 8B542404 // 8B4104 // 85C0 // 740D // 3B5010 // 7405 // 8B4004 // EBF2 // C20400 // 0F0B",
        "ExpHP.seasons-everywhere.allocate-enemy-exes": "51 // 52 // 50 // E8 [codecave:ExpHP.seasons-everywhere.new-enemy-ex] // 5A // 59 // 8B8190000000 // E800000000 // C7042438ED4100 // C3",
        "ExpHP.seasons-everywhere.deallocate-enemy-exes": "51 // 52 // FFB660570000 // E8 [codecave:ExpHP.seasons-everywhere.free-enemy-ex-by-id] // 5A // 59 // 8B8690520000 // E800000000 // C7042480DB4100 // C3",
        "ExpHP.seasons-everywhere.item-anm-script": "83F8 30 // 74 13 // C787 580C0000 02000000 // FF34C5 A80D4A00 // EB 15 // C787 580C0000 09000000 // E8 [codecave:ExpHP.seasons-everywhere.get-season] // 05 81000000 // 50 // E8 00000000 // C70424 B8344300 // C3",
        "ExpHP.seasons-everywhere.item-on-graze": "8B15 D0774B00 // 8D92 10060000 // 8B7B 08 // 83EC 20 // F30F1047 04 // F30F5C42 04 // F30F114424 0C // D94424 0C // F30F1007 // F30F5C02 // F30F114424 0C // D94424 0C // B8 706E4900 // FF D0 // C74424 1C FFFFFFFF // C74424 10 3333F33F // D95C24 0C // 897C24 04 // C70424 30000000 // 8B0D B8764B00 // B8 40474300 // FF D0 // 5f // 5e // 8be5 // 5d // E8 00000000 // C70424 E1A04400 // C3",
        "ExpHP.seasons-everywhere.item-pickup-effect": "83F930 // 7413 // 8D41FF // 83F80D // E800000000 // C70424333B4300 // C3 // E8 [codecave:ExpHP.seasons-everywhere.increment-season-power] // 85C0 // 7422 // 6840FFFFFF // 6AFF // 8DB7100C0000 // 56 // B8 700b4500 // FFD0 // F30F1016 // 6A3F // B8 F0544600 // FFD0 // 8B35D0774B00 // 8974240C // E800000000 // C70424863F4300 // C3",
        "ExpHP.seasons-everywhere.get-season": "6A 00 // 68 CAE0FFFF // 6A 00 // E8 [codecave:ExpHP.seasons-everywhere.eclplus-int-switch] // C3",
        "ExpHP.seasons-everywhere.get-active-release": "6A 00 // 68 CCE0FFFF // 6A 00 // E8 [codecave:ExpHP.seasons-everywhere.eclplus-int-switch] // C3",
        "ExpHP.seasons-everywhere.is-bomb-or-release-autocollecting": "A188764B00 // 83783001 // 7508 // 8378383C // 7D02 // EB0E // E8 [codecave:ExpHP.seasons-everywhere.get-active-release] // 85C0 // 7E02 // EB03 // 31C0 // C3 // B801000000 // C3",
        "ExpHP.seasons-everywhere.increment-season-power": "51 // 52 // 6A 01 // 68 CBE0FFFF // 6A 00 // E8 [codecave:ExpHP.seasons-everywhere.eclplus-int-switch] // 8138 74040000 // 7D 33 // FF00 // 8B00 // 83F8 64 // 74 27 // 3D E6000000 // 74 20 // 3D 86010000 // 74 19 // 3D 4E020000 // 74 12 // 3D 48030000 // 74 0B // 3D 74040000 // 74 04 // 31C0 // EB 05 // B8 01000000 // 5A // 59 // C3",
        "ExpHP.seasons-everywhere.item-flyout-state": "83F8 03 // 74 07 // 83F8 09 // 74 1C // EB 0D // E8 00000000 // C70424 23384300 // C3 // E8 00000000 // C70424 72384300 // C3 // F30F1005 18594B00 // F30F108F 1C0C0000 // F30F1097 200C0000 // F30F109F 240C0000 // F30F59C8 // F30F59D0 // F30F59D8 // F30F588F 100C0000 // F30F5897 140C0000 // F30F589F 180C0000 // F30F118F 100C0000 // F30F1197 140C0000 // F30F119F 180C0000 // F30F1087 280C0000 // F30F5C05 C03A4A00 // F30F1187 280C0000 // 83EC 08 // F30F114424 04 // F30F1087 2C0C0000 // F30F110424 // 8D8F 1C0C0000 // B8 F04C4300 // FFD0 // E8 [codecave:ExpHP.seasons-everywhere.is-bomb-or-release-autocollecting] // 0987700C0000 // 0F2FAF 280C0000 // 7315 // F30F1087 140C0000 // E8 00000000 // C70424 27374300 // C3 // 8B35 D0774B00 // 83BF 700C0000 00 // B8 03000000 // B9 01000000 // 0F44C1 // 8987 580C0000 // C787 1C0C0000 00000000 // C787 200C0000 00000000 // C787 240C0000 00000000 // C787 280C0000 00000000 // C787 2C0C0000 DB0FC93F // 8B86 3C900100 // 8B40 08 // 8987 640C0000 // 8B4C24 10 // E8 00000000 // C70424 20354300 // C3",
        "ExpHP.seasons-everywhere.autocollect-state-1": "E8 [codecave:ExpHP.seasons-everywhere.is-bomb-or-release-autocollecting] // 85C0 // 740D // E8 00000000 // C70424 0A384300 // C3 // E8 00000000 // C70424 A5354300 // C3",
        "ExpHP.seasons-everywhere.autocollect-state-4": "E8 [codecave:ExpHP.seasons-everywhere.is-bomb-or-release-autocollecting] // 85C0 // 740D // E8 00000000 // C70424 0A384300 // C3 // E8 00000000 // C70424 C8384300 // C3",
        "ExpHP.seasons-everywhere.use-release-cancel-mode": "52 // 51 // 83EC04 // F30F110424 // 8B0C24 // 85C9 // B801000000 // BA04000000 // 0F4CC2 // 81E1FFFFFF7F // 890C24 // F30F100424 // 83C404 // 59 // 5A // 50 // 89F9 // F30F118598FBFFFF // E800000000 // C70424AB5C4200 // C3",
        "ExpHP.seasons-everywhere.impl-cancel-modes": "83FA01 // 7407 // 83FA04 // 740F // EB5F // E800000000 // C70424A19C4100 // C3 // B968764B00 // B880284000 // FFD0 // D80DF83A4A00 // D95DFC // F30F1045FC // F30F5C05F43B4A00 // 6AFF // 51 // 6A00 // 83EC0C // C7442408CDCC0C40 // F30F11442404 // 56 // 6A30 // 8B0DB8764B00 // B840474300 // FFD0 // C780700C000001000000 // E800000000 // C70424E59C4100 // C3",
        "ExpHP.seasons-everywhere.item-noattract": "83F804 // 740C // 83F803 // 7407 // 83F809 // 7402 // EB0D // E800000000 // C7042498404300 // C3 // E800000000 // C70424E93F4300 // C3",
        "ExpHP.seasons-everywhere.impl-drop-season-items": "55 // 89E5 // 57 // 56 // 8B8160570000 // 50 // E8 [codecave:ExpHP.seasons-everywhere.find-enemy-ex-by-id] // 89C7 // 89F9 // E8 [codecave:ExpHP.seasons-everywhere.ex-get-season-bonus] // 89C6 // 85F6 // 7E0C // 8B4508 // 50 // E8 [codecave:ExpHP.seasons-everywhere.drop-one-item] // 4E // 7FF4 // C7473400000000 // C7473800000000 // 5E // 5F // 89EC // 5D // C20400",
        "ExpHP.seasons-everywhere.ex-get-season-bonus": "8B4120 // 85C0 // 7F04 // 8B4138 // C3 // 8B4134 // 2B4138 // 0FAF4120 // 99 // F77930 // 034138 // C3",
        "ExpHP.seasons-everywhere.drop-one-item": "55 // 89E5 // 83EC24 // C7442420FFFFFFFF // C744241C0DF00000 // C744241800000000 // B968764B00 // B840284000 // FFD0 // C704243333F33F // D80C24 // D805043B4A00 // D95C2414 // B968764B00 // E8 [codecave:ExpHP.seasons-everywhere.randf-minus-pi-to-pi] // D95C2410 // C744240C0DF00000 // 8B4D08 // 894C2408 // C744240430000000 // 83C404 // 8B0DB8764B00 // B840474300 // FFD0 // 89EC // 5D // C20400",
        "ExpHP.seasons-everywhere.drop-season-items": "8B4508 // 50 // 8B4DF8 // 8D8970C0FFFF // 8D89F4EDFFFF // E8 [codecave:ExpHP.seasons-everywhere.impl-drop-season-items] // 6888000000 // E800000000 // C704243ADA4100 // C3",
        "ExpHP.seasons-everywhere.eclplus-int-switch": "55 // 89 E5 // 83 e4f0 // 81 ec80000000 // 0f290424 // 0f294c2410 // 0f29542420 // 0f295c2430 // 0f29642440 // 0f296c2450 // 0f29742460 // 0f297c2470 // 51 // 52 // ff 75 10 // ff 75 0c // ff 75 08 // FF15 E49F4900 // 5a // 59 // 0f280424 // 0f284c2410 // 0f28542420 // 0f285c2430 // 0f28642440 // 0f286c2450 // 0f28742460 // 0f287c2470 // 89 EC // 5D // C2 0c00",
        "ExpHP.seasons-everywhere.zunlist-prepend": "8B542404 // 8B4208 // 0B4104 // 0B4108 // 85C0 // 750B // 895104 // 894A08 // 89C8 // C20400 // 0F0B",
        "ExpHP.seasons-everywhere.zunlist-insert-after": "8B542404 // 8B4104 // 0B4108 // 85C0 // 7518 // 8B4204 // 894104 // 85C0 // 7403 // 894808 // 895108 // 894A04 // 89C8 // C20400 // 0F0B",
        "ExpHP.seasons-everywhere.zunlist-remove-node": "8B4104 // 8B5108 // 85C0 // 7403 // 895008 // 85D2 // 7403 // 894204 // C7410400000000 // C7410800000000 // 89C8 // C3",
        "ExpHP.seasons-everywhere.calloc": "55 // 89E5 // 57 // 8B4508 // 50 // B850B24700 // FFD0 // 89C7 // 8B4508 // 50 // 6A00 // 57 // B860CE4700 // FFD0 // 89F8 // 5F // 89EC // 5D // C20400",
        "ExpHP.seasons-everywhere.randf-minus-pi-to-pi": "55 // 89E5 // 51 // 9B // DBE3 // B8B0274000 // FFD0 // 660F6EC0 // C745FC83F9224E // F30FE6C0 // C1E81F // F20F5804C5303F4A00 // 660F5AC0 // F30F5E45FC // F30F5C0588454900 // F30F1145FC // D945FC // 89EC // 5D // C3"
    }
}