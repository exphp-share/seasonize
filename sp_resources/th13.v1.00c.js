{
	"binhacks": {
		"Spell practice with Bombs and Lives :: Entry Point": {
			"addr":     "0x0042BBDA",
			"expected": "89 3D F4E74B00 // 89 3D 00E84B00",
			"code":     "83 C7 05 // E9 60FDFFFF // CC CC // 31 FF",
			"COMMENT": [
				"(edi is initially zero)",
				"add edi, 5",
				"jmp 0042B942         (to cave 1)",
				"XXX",
				"xor edi, edi"
			]
		},
		"Spell practice with Bombs and Lives :: Code Cave 1": {
			"addr":     "0x0042B942",
			"expected": "CC CC CC CC CC CC CC CC CC CC CC",
			"code":     "89 3D F4E74B00 // E9 67FFFFFF",
			"COMMENT": [
				"mov [004BE7F4], edi   (write Lives)",
				"jmp 0042B8B4          (to cave 2)"
			]
		},
		"Spell practice with Bombs and Lives :: Code Cave 2": {
			"addr":     "0x0042B8B4",
			"expected": "CC CC CC CC CC CC CC CC CC CC CC",
			"code":     "89 3D 00E84B00 // E9 25030000",
			"COMMENT": [
				"mov [004BE800], edi   (write Bombs)",
				"jmp 0042BBE4          (to xor edi, edi)"
			]
		}
	}
}
