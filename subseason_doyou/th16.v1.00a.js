{
	"binhacks": {
		"Dog Days subseason in standard play": {
			"addr":     "0x00450DF6",
			"expected": "EB 0A // C7 05 AC574A00 04000000",
			"code":     "90 90 // C7 05 AC574A00 04000000"
		},
		"Dog Days subseason in Spell Practice": {
			"addr":     "0x00455F97",
			"expected": "8B 47 24",
			"code":     "90 // B0 04",
			"COMMENT": {
				"old": ["mov eax,[edi+24]"],
				"new": ["nop", "mov al,04"]
			}
		},
		"Dog Days subseason in Stage Practice": {
			"addr":     "0x00450D8F",
			"expected": "8B 47 24",
			"code":     "90 // B0 04",
			"COMMENT": {
				"old": ["mov eax,[edi+24]"],
				"new": ["nop", "mov al,04"]
			}
		}
	}
}
