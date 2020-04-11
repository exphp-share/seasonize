; THIS IS NOT A SOURCE FILE
;
; Changing anything in this file will NOT have any effect on the patch.
; This file is where I write the initial asm for many binhacks.  I use
;
;     scripts/list-asm source/x.asm
;
; to generate the assembly, copy it into th17.YAML, and postprocess it with
; some manual fixes like inserting [codecave:yadda-yadda-yadda] and deleting
; dummy labels. Sometimes I fix this file in tandum with adjustments made to
; the ASM, but not always.
;
; It's only checked into VCS because it's useful to have a starting point
; for assembly when fixing a bug in an existing binhack. (also the structs and
; consts can be useful).

; -----
; If you're wondering why I keep writing "mov _, eax; call eax" it's because
; thcrap's syntax for generating relative addresses is giving nonsense errors
; in TH17, so that's a workaround to call absolute addresses.
;
; Same with that horrifying "call .next" stuff. (that's an absolute jump)
; ...you'll see.

%define MALLOC 0x47b250
%define FREE 0x47ef9f
%define RANDF_NEG_1_TO_1 0x402880
%define ITMMGR_SPAWN_ITEM 0x434740
%define FIND_ENEMY_FULL_BY_ID 0x41ddd0

%define ECLP_GET_VALUE 0
%define ECLP_GET_PTR   1

%define VAR_GI4 -7990
%define VAR_GI5 -7989
%define VAR_GI6 -7988
%define VAR_GI7 -7987

%define VAR_SEASON          VAR_GI4
%define VAR_SEASON_POWER    VAR_GI5
%define VAR_ACTIVE_RELEASE  VAR_GI6

%define FLOAT_ONE_HALF 0x4a3b48
%define FLOAT_PI_OVER_18 0x4a3af8
%define FLOAT_PI_OVER_2 0x4a3bf4

%define SHOTTYPE_PTR 0x4b7688
%define ITEM_MANAGER_PTR 0x4b76b8
%define SAFE_RNG 0x4b7668

%define en_final_pos 0x44
%define en_var_f2 0x2a4
%define en_force_autocollect 0xc70

%define et_diameter 0x64c
%define et_pos_x 0x62c
%define et_pos_y 0x630

%define st_bomb_is_active 0x30
%define st_bomb_time 0x38

%define efull_enemy 0x120c

segment .data
struc ZunList
    l_ptr resd 1
    l_next resd 1
    l_prev resd 1
    l_fld_c resd 1
endstruc

struc Globals
    g_enemy_ex_head resd 4
endstruc

struc EnemyEx
    ex_node resd 4
    ex_id   resd 1
    ex_damage_per_season_item resd 1
    ex_damage_accounted_for   resd 1
endstruc

; workaround for [Rx] being broken  (side-effect-free absolute jump)
%macro  abs_jmp_hack 1 
        call %%next 
    %%next:
        mov dword [esp], %1
        ret
%endmacro

segment .text
_main:
    cmp eax, 0x30
    je season

non_season:
    mov dword [edi + 0xc58], 2
    push dword [eax*8 + 0x4a0da8]
    jmp finish

season:
    mov dword [edi + 0xc58], 2
    call finish
    add eax, 0x81
    push eax




finish:


spawn:
    mov edx, [0x4b77d0]  ; PLAYER
    lea edx, [edx+0x610] ; player pos
    mov edi, [ebp+0x8] ; bullet pos
    sub esp, 0x20 ; spawn_item has 8 args

    ; Compute angle away from player.
    movss xmm0, [edi + 4]  ; bullet y
    subss xmm0, [edx + 4]  ; bullet y - player y
    movss DWORD [esp + 0xc], xmm0  ; use vel_angle arg as scratch
    fld DWORD [esp + 0xc]
    movss xmm0, [edi]  ; bullet x
    subss xmm0, [edx]  ; bullet x - player x
    movss DWORD [esp + 0xc], xmm0
    fld DWORD [esp + 0xc]
    call math_atan2  ; math_atan2

    mov  DWORD [esp + 0x1c], 0xffffffff ; arg 8: unknown (TODO)
    mov  DWORD [esp + 0x10], 0x3ff33333 ; arg 5: vel_norm  (1.9f)
    fstp DWORD [esp + 0xc]              ; arg 4: vel_angle
    mov  DWORD [esp + 0x4], edi         ; arg 2: pos
    mov  DWORD [esp + 0x0], 0x30        ; arg 1: item type

    mov ecx, [0x4b76b8]  ; method receiver: global ItemManager
    call spawn_item
    jmp home

math_atan2: ; 0x496e70
spawn_item: ; 0x434740
home:


item_flyout:
    cmp eax, 0x3
    je .jmp_to_case_3
    cmp eax, 0x9
    je .case_9
    jmp .jmp_to_more_cases

; workaround for [Rx] being broken  (side-effect-free absolute jump)
.jmp_to_case_3:
    call .next3
.next3:
    mov     dword [esp], 0x433823  ; state 3 code
    ret

; workaround for [Rx] being broken  (side-effect-free absolute jump)
.jmp_to_more_cases:
    call .next4
.next4:
    mov     dword [esp], 0x433872  ; next in if-then-else chain
    ret

.case_9:
    ; Move in a straight line
    movss   xmm0, dword [0x004b5918]  ; GAME_SPEED
    movss   xmm1, dword [edi+0xc1c] ; {Item::velocity.x}
    movss   xmm2, dword [edi+0xc20] ; {Item::velocity.y}
    movss   xmm3, dword [edi+0xc24] ; {Item::velocity.z}
    mulss   xmm1, xmm0
    mulss   xmm2, xmm0
    mulss   xmm3, xmm0
    addss   xmm1, dword [edi+0xc10] ; {Item::position.x}
    addss   xmm2, dword [edi+0xc14] ; {Item::position.y}
    addss   xmm3, dword [edi+0xc18] ; {Item::position.z}
    movss   dword [edi+0xc10], xmm1 ; {Item::position.x}
    movss   dword [edi+0xc14], xmm2 ; {Item::position.y}
    movss   dword [edi+0xc18], xmm3 ; {Item::position.z}

    ; reduce velocity magnitude by 0.03f, compute new velocity vector
    movss   xmm0, dword [edi+0xc28]  ; {Item::velocity_magnitude}
    ; TH16 doesn't multiply this by GAME_SPEED, so we won't either.
    ; (seems like a bug to me though...)
    subss   xmm0, dword [0x004a3ac0]  ; 0.03f
    movss   dword [edi+0xc28], xmm0  ; {Item::velocity_magnitude}
    sub     esp, 0x8
    movss   dword [esp+0x4], xmm0  ; arg 2: magnitude
    movss   xmm0, dword [edi+0xc2c]  ; {Item::velocity_angle}
    movss   dword [esp], xmm0  ; arg 1: angle
    lea     ecx, [edi+0xc1c]  ; arg 0: output
    mov     eax, 0x434cf0  ; cartesian_from_polar
    call    eax

    ; TODO: TEST SEASON AUTOCOLLECT (graze and then quickly use spring release)
    ;
    ; If a bomb/release autocollects during any frame of the flyout state,
    ; the item will be autocollected once it stops moving
    call    codecave_is_bomb_or_release_autocollecting
    or      [edi+en_force_autocollect], eax

    comiss  xmm5, dword [edi+0xc28] ; compare 0.0f to {Item::velocity_magnitude}
    jnb     .velocity_nonpositive

.velocity_positive:
    ; Jump to code that deletes out of bounds and collects touched items.
    ; Dumb workaround for  jmp 0x00433727

    movss   xmm0, dword [edi+0xc14] ; {Item::position.y}

    call    .next
.next:
    mov     dword [esp], 0x00433727  
    ret  ; (side-effect free jump to absolute address)

.velocity_nonpositive:
    ; If force_autocollect, next state is autocollected.
    ;            otherwise, next state is falling.

    mov     esi, dword [0x4b77d0]  ; PLAYER_STRUCT_PTR

    cmp     dword [edi+0xc70], 0x0  ; {Item::force_autocollect__season_only}
    mov     eax, 0x3  ; autocollected state
    mov     ecx, 0x1  ; falling state
    cmove   eax, ecx
    mov     dword [edi+0xc58], eax  ; {Item::state}

    ; These velocity fields will be used if we switch to falling.
    mov     dword [edi+0xc1c], 0x0  ; {Item::velocity.x}
    mov     dword [edi+0xc20], 0x0  ; {Item::velocity.y}
    mov     dword [edi+0xc24], 0x0  ; {Item::velocity.z}
    mov     dword [edi+0xc28], 0x0  ; {Item::velocity_magnitude}
    mov     dword [edi+0xc2c], 0x3fc90fdb  ; {Item::velocity_angle} {PI/2; straight down}

    ; These velocity fields will be used if we switch to autocollected.
    ; to find these offsets just find the place where the rising state transitions to
    ; the autocollected state (0x0043380a in TH17)
    mov     eax, dword [esi+0x1903c]  ; {Player::__unknown_field}
    mov     eax, dword [eax+0x8]
    mov     dword [edi+0xc5c], eax  ; {Item::velocity_magnitude_towards_player}
    mov     ecx, dword [esp+0x10]  ; restore ItemManager to ecx

    ; Jump to body of Falling state, regardless of which state we have become.
    ; It's only for one frame and velocity is zero, so we won't actually fall if autocollected.
    ;
    ; workaround for [Rx] being broken  (side-effect-free absolute jump)
    call    .next2
.next2:
    mov     dword [esp], 0x00433520
    ret  ; (side-effect free jump to absolute address)



item_noattract:
    ; The original two checks
    cmp     eax, 0x4
    je      .cannot_attract
    cmp     eax, 0x3
    je      .cannot_attract

    ; New check added by us
    cmp     eax, 0x9
    je      .cannot_attract

    jmp     .can_attract

; workaround for [Rx] being broken  (side-effect-free absolute jump)
.cannot_attract:
    call    .next
.next:
    mov     dword [esp], 0x00434098
    ret

.can_attract:
    call    .next2
.next2:
    mov     dword [esp], 0x00433fe9
    ret

item_collect_season:
    push ecx
    push edx

    push 1      ; arg 3: mode    (1 = get pointer)
    push -7991  ; arg 2: var ID  (GI5)
    push 0      ; arg 1: enemy   (null)
    ; call -everywhere.eclplus-int-switch]" # call

    ; stop now if already max season
    cmp DWORD [eax], 1140
    jnl    .bad

    ; increment and find out if we hit a requirement
    inc DWORD [eax]
    mov eax, [eax]

    ; (a )
    cmp    eax, 100
    je     .good
    cmp    eax, 230
    je     .good
    cmp    eax, 390
    je     .good
    cmp    eax, 590
    je     .good
    cmp    eax, 840
    je     .good
    cmp    eax, 1140
    je     .good

.bad:
    xor eax, eax
    jmp .end
.good:
    mov eax, 1
.end:
    pop edx
    pop ecx
    ret


effect_codecave:
    cmp     ecx, 0x30
    je      .effect

    ; original code
    lea     eax, [ecx-0x1]
    cmp     eax, 0xd

    ; workaround for [Rx] being broken  (side-effect-free absolute jump)
    call    .next2
.next2:
    mov     dword [esp], 0x00433b33
    ret

.effect:
    call    effect_codecave
    test    eax, eax
    jz      .skip

.season_level_increase:
    ; At this point, TH16 calls a method on Player to make it regenerate its options.
    ; We haven't implemented subseason options (...yet?), so there's no point.

    push    0xffffff40  ; color
    push    0xffffffff  ; value -1 (displays "PowerUp")
    lea     esi, [edi+0xc10]  ; Item::position
    push    esi
    mov     eax, 0x44a460  ; generate_chinese_numeral_popup
    call    eax
    movss   xmm2, dword [esi]
    push    0x3f
    mov     eax, 0x45e1f0  ; play_sound_at_position
    call    eax

    ; TH16 adds 10 points to score here.
    ; We don't bother because it's unclear how well this would balance
    ; with TH17 scoring, and also because add_to_score is small enough
    ; in TH17 that it got inlined everywhere. (yet is still nontrivial)

.skip:
    ; other item pickup branches in TH17 do this if they modified esi
    mov     esi, dword [0x4b77d0]
    mov     dword [esp+0xc], esi

    ; workaround for [Rx] being broken  (side-effect-free absolute jump)
    call    .next
.next:
    mov     dword [esp], 0x433f86
    ret



new_enemy_ex:
    push   0x1c
    mov    eax, MALLOC
    call   eax

    mov    ecx, 0x55555555  ; REPLACE WITH <codecave for globals>

    lea    ecx, [ecx+g_enemy_ex_head]
    push   ecx
    mov    ecx, eax
    call   zunlist_insert_after  ; FIXUP
    mov    [ecx], eax  ;  globals.list_head = new_ex
    ; return the EnemyEx
    ret

; [esp+0x4] is an enemy id.
free_enemy_ex_by_id:
    call   find_enemy_ex_by_id  ; FIXUP
    mov    ecx, eax
    call   zunlist_remove_node  ; FIXUP
    push   eax
    mov    eax, FREE
    call   eax
    ret    ; not ret 4; we forwarded the arg to find_enemy_by_id

; [esp+0x4] is an enemy id.
find_enemy_ex_by_id:
    mov    ecx, 0x55555555  ; REPLACE WITH <codecave for globals>
    lea    ecx, [ecx+g_enemy_ex_head]
    mov    edx, [esp+0x4]  ; desired id
    mov    eax, [ecx+l_next]
.loop:
    test   eax, eax
    jz     .notfound
    cmp    edx, [eax+ex_id]
    je     .found
    mov    eax, [eax+l_next]
    jmp    .loop
.found:
    ret 4
.notfound:
    ud2

; ecx is a node not in any list. (this is checked)
; [esp+0x4] is a list head. (this is checked)
; Makes ecx into a list head, and returns it.
zunlist_prepend:
    mov    edx, [esp+0x4]
    mov    eax, [edx+l_prev]  ; head.prev
    or     eax, [ecx+l_next]  ; this.next
    or     eax, [ecx+l_prev]  ; this.prev
    test   eax, eax        ; are any nonnull?
    jnz    .error
    
    mov    [ecx+l_next], edx  ; this.next = head
    mov    [edx+l_prev], ecx  ; head.prev = this
    mov    eax, ecx
    ret    0x4
.error:
    ud2

; ecx is a node not in any list. (this is checked)
; [esp+0x4] is any node.
zunlist_insert_after:
    mov    edx, [esp+0x4]
    mov    eax, [ecx+l_next]  ; this.next
    or     eax, [ecx+l_prev]  ; this.prev
    test   eax, eax        ; are any nonnull?
    jnz    .error
    
    mov    eax, [edx+l_next]
    mov    [ecx+l_next], eax  ; this.next = node.next
    test   eax, eax
    jz     .no_next
    mov    ecx, [eax+l_prev]  ; node.next.prev = this
.no_next:

    mov    [ecx+l_prev], edx  ; this.prev = node
    mov    [edx+l_next], ecx  ; node.next = this
    mov    eax, ecx
    ret    0x4
.error:
    ud2

; Removes the node in ecx from its list.
; Returns ecx.
zunlist_remove_node:
    mov    eax, [ecx+l_next]  ; this.next
    mov    edx, [ecx+l_prev]  ; this.prev

    test   eax, eax
    jz     .no_next
    mov    [eax+l_prev], edx  ; next.prev = this.prev
.no_next:

    test   edx, edx
    jz     .no_prev
    mov    [edx+l_next], eax  ; prev.next = this.next
.no_prev:

    mov    DWORD [ecx+l_next], 0x0  ; this.prev = 0
    mov    DWORD [ecx+l_prev], 0x0  ; this.next = 0
    mov    eax, ecx
    ret

codecave_eclplus_int_switch:

; returns enemy id if there is a release, -1 if in cooldown, 0 otherwise.
codecave_get_active_release:
    push    ECLP_GET_VALUE      ; arg 3: mode
    push    VAR_ACTIVE_RELEASE  ; arg 2: var ID
    push    0                   ; arg 1: enemy ptr
    call    codecave_eclplus_int_switch
    ret

; Several places in the item update code check the following two conditions for autocollection:
; - Is there an active bomb less than 60 frames old?
; - Is there an active release, period?
;
; (of course, TH17 only checks the first condition. We add the latter!)
codecave_is_bomb_or_release_autocollecting:
    mov     eax, [SHOTTYPE_PTR]
    cmp     dword [eax+st_bomb_is_active], 0x1
    jne     .nobomb
    cmp     dword [eax+st_bomb_time], 0x3c  ; < 60 frames
    jge     .nobomb
    jmp     .success
.nobomb:
    call    codecave_get_active_release
    test    eax, eax
    jng     .norelease    ; positive (active)
    jmp     .success
.norelease:
    xor     eax, eax
    ret
.success:
    mov     eax, 0x1
    ret

codecave_use_release_cancel_mode:
    ; An explanation:
    ; In TH17, the stack argument to the "cancel_bullets_in_radius" functions
    ; looks like a boolean `is_cancel` because it only has the values 0 and 1,
    ; but in fact it is more like a `cancel_mode` enum.
    ; In TH16, bullets cancelled by releases had a "cancel mode" of 4,
    ; which was checked to generate the season items. Given that the function that
    ; generates the items is used by many different types of objects (not just the
    ; Bullet struct), it seems best to continue this practice.
    ; 
    ; We can't supply a cancel mode from ECL, so instead, releases are scripted
    ; to supply negative radii.
    push    edx
    push    ecx
    sub     esp, 0x4
    movss   [esp], xmm0  ; xmm0 has radius

    ; if radius < 0, it's a release.
    ; we'll operate on the sign bit using an integer register because it's easier.
    mov     ecx, [esp]  ; reinterpreting bits as integer
    test    ecx, ecx
    mov     eax, 0x1
    mov     edx, 0x4
    cmovl   eax, edx
    and     ecx, 0x7fffffff  ; take absolute value
    mov     [esp], ecx

    movss   xmm0, [esp]
    add     esp, 0x4
    pop     ecx
    pop     edx

    push    eax  ; supply as stack arg to cancel_bullets_in_radius function

    ; original code
    mov     ecx, edi
    movss   dword [ebp-0x468], xmm0
    abs_jmp_hack  0x425cab


;     call    codecave_get_active_release
;     test    eax, eax
;     jle     .not_release

;     push    eax
;     mov     eax, FIND_ENEMY_FULL_BY_ID
;     call    eax
;     test    eax, eax
;     jz      .not_release

; .release
;     push    edi

;     lea     eax, [eax+efull_enemy]
;     lea     edi, [eax+en_final_pos]
;     movss   xmm0, [eax+en_var_f2] ; current release radius

    ; ; Compute both (sum of radii)^2 and distance^2, using math copied
    ; ; straight from etCancel.

    ; mov     ecx, 
    ; movss   xmm2, dword [ecx+et_diameter]
    ; mulss   xmm2, dword [FLOAT_ONE_HALF]
    ; movss   xmm1, dword [ecx+et_pos_x]
    ; subss   xmm1, dword [edi]
    ; addss   xmm2, xmm0
    ; movss   xmm0, dword [ecx+et_pos_y]
    ; subss   xmm0, dword [edi+0x4]
    ; mulss   xmm1, xmm1
    ; mulss   xmm0, xmm0
    ; mulss   xmm2, xmm2
    ; addss   xmm1, xmm0
    ; ; The above floating point math should be bit-for-bit identical to the
    ; ; math performed by et_cancel_in_radius, but let's add a sliiiight fudge
    ; ; factor anyways because I'm paranoid.
    ; ;
    ; ; False positives created by this will be next to non-existent.
    ; ; (only affects bullets right at the edge of a release, and there needs
    ; ;  to be something else that cancels them).
    ; push    0x3f8020c5  ; 1.001
    ; mulss   xmm2, [esp] ; use it to increase the radii a bit
    ; pop     eax

    ; pop     edi

    ; xor     eax, eax
    ; comiss  xmm2, xmm1
    ; ; why isn't this just jb?
    ; ; ...whatever, this is just what the game does, stop asking questions.
    ; setae   al
    ; test    eax, eax
    ; je      .not_release

codecave_impl_release_cancel_modes:
    cmp     edx, 0x1
    je      .mode_1
    cmp     edx, 0x4
    je      .mode_4
    jmp     .mode_0

.mode_1:
    abs_jmp_hack 0x419ca1

.mode_4:
    ; Random direction +/- 10 degrees from straight up
    mov     ecx, SAFE_RNG
    mov     eax, RANDF_NEG_1_TO_1
    call    eax
    fmul    dword [FLOAT_PI_OVER_18]
    fstp    dword [ebp-0x4]
    movss   xmm0, dword [ebp-0x4]
    subss   xmm0, dword [FLOAT_PI_OVER_2]

    push    0xffffffff ; stack arg 20:  (unknown, new in TH17)
    push    ecx ; stack arg 1c:  (unused/optimized away)
    push    0x0 ; stack arg 18:  intangibility frames (ignored for PIV/season)
    sub     esp, 0xc
    mov     dword [esp+0x8], 0x400ccccd  ; stack arg 14: vel_norm
    movss   dword [esp+0x4], xmm0        ; stack arg 10: vel_angle
    push    esi   ; stack arg 8: pos
    push    0x30  ; stack arg 4: item type
    mov     ecx, dword [ITEM_MANAGER_PTR]
    mov     eax, ITMMGR_SPAWN_ITEM
    call    eax
    ; Make the item get autocollected once it stops moving.
    ; (this is implemented by another binhack; this field is an unused leftover from TH16)
    mov     dword [eax+en_force_autocollect], 1

.mode_0:
    abs_jmp_hack 0x419ce5

codecave_autocollect_state_1: ; 0x433590
    call    codecave_is_bomb_or_release_autocollecting
    test    eax, eax
    jz      .failure
.success:
    abs_jmp_hack 0x43380a
.failure:
    abs_jmp_hack 0x4335a5

codecave_autocollect_state_4: ; 0x4338b3
    call    codecave_is_bomb_or_release_autocollecting
    test    eax, eax
    jz      .failure
.success:
    abs_jmp_hack 0x43380a
.failure:
    abs_jmp_hack 0x4338c8
