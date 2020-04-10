entry entry0 {
    version: 8,
    name: "source/img/face/dummy.png",
    format: 7,
    width: 4,
    height: 4,
    memoryPriority: 0,
    lowResScale: 0,
    hasData: 1,
    THTXSize: 16,
    THTXFormat: 7,
    THTXWidth: 4,
    THTXHeight: 4,
    THTXZero: 0,
    sprites: {
        unused: { x: 0, y: 0, w: 4, h: 4 }
    }
}

script doyou1 {
    sprite(-1);
    layer(13);
    drawStar(1.0f, 32);
    blendMode(2);
    color(255, 128, 128);
    color2(255, 128, 0);
    alpha(255);
    alpha2(255);
    angleVel(0.17453292f, 0.0f, 0.17453292f);
    stop();
}

script doyou2 {
    sprite(-1);
    layer(12);
    drawStar(1.0f, 12);
    blendMode(1);
    color(128, 192, 255);
    color2(0, 192, 255);
    alpha(128);
    alpha2(128);
    angleVel(-0.17453292f, 0.0f, -0.17453292f);
    stop();
}

script fall1 {
    sprite(-1);
    layer(13);
    drawStar(1.0f, 32);
    blendMode(2);
    color(128, 128, 255);
    color2(0, 128, 255);
    alpha(255);
    alpha2(255);
    angleVel(0.17453292f, 0.0f, 0.17453292f);
    stop();
}

script fall2 {
    sprite(-1);
    layer(12);
    drawStar(1.0f, 12);
    blendMode(1);
    color(255, 192, 128);
    color2(255, 192, 0);
    alpha(128);
    alpha2(128);
    angleVel(-0.17453292f, 0.0f, -0.17453292f);
    stop();
}

script spring1 {
    sprite(-1);
    layer(13);
    drawStar(1.0f, 32);
    blendMode(2);
    color(128, 128, 128);
    color2(0, 128, 0);
    alpha(255);
    alpha2(255);
    stop();
}

script spring2 {
    sprite(-1);
    layer(12);
    drawStar(1.0f, 32);
    blendMode(1);
    color(255, 128, 128);
    color2(255, 0, 0);
    alpha(255);
    alpha2(255);
    stop();
}

script summer1 {
    sprite(-1);
    layer(13);
    drawStar(1.0f, 32);
    blendMode(2);
    color(255, 128, 128);
    color2(255, 128, 0);
    alpha(255);
    alpha2(255);
    angleVel(0.17453292f, 0.0f, 0.17453292f);
    stop();
}

script summer2 {
    sprite(-1);
    layer(12);
    drawStar(1.0f, 12);
    blendMode(1);
    color(128, 192, 255);
    color2(0, 192, 255);
    alpha(128);
    alpha2(128);
    angleVel(-0.17453292f, 0.0f, -0.17453292f);
    stop();
}

script winter1 {
    sprite(-1);
    layer(13);
    drawStar(1.0f, 32);
    blendMode(2);
    color(255, 128, 128);
    color2(255, 128, 0);
    alpha(255);
    alpha2(255);
    angleVel(0.17453292f, 0.0f, 0.17453292f);
    stop();
}

script winter2 {
    sprite(-1);
    layer(12);
    drawStar(1.0f, 12);
    blendMode(1);
    color(128, 192, 255);
    color2(0, 192, 255);
    alpha(128);
    alpha2(128);
    angleVel(-0.17453292f, 0.0f, -0.17453292f);
    stop();
}

script menu_bg {
    sprite(-1);
    layer(12);
    drawStar(1.0f, 32);
    blendMode(1);
    color(64, 64, 64);
    color2(64, 64, 64);
    alpha(10);
    alpha2(255);
    angleVel(0.17453292f, 0.0f, 0.17453292f);
    stop();

    case(1); // spring
    alphaTime(5, 0, 10);
    color2Time(5, 0, 0xfc, 0x0f, 0xc0);  // pank
    stop();

    case(2); // summer
    alphaTime(5, 0, 10);
    color2Time(5, 0, 0, 0xb0, 255);
    stop();
    
    case(3); // fall
    alphaTime(5, 0, 10);
    color2Time(5, 0, 255, 192, 128);
    stop();
    
    case(4); // winter
    alphaTime(5, 0, 10);
    color2Time(5, 0, 0x8a, 0x2b, 0xe2);
    stop();
    
    case(5);
    alphaTime(5, 0, 50);
    color2Time(5, 0, 192, 192, 192);
    stop();

    case(7);
    scaleTime(90, 3, 0f, 0f);
+90:
    end();
}

script menu_vortex {
    sprite(-1);
    layer(13);
    drawStar(1.0f, 7);
    blendMode(2);
    color(128, 128, 128);
    color2(128, 128, 128);
    alpha(64);
    alpha2(64);
    angleVel(-0.1f, 0.0f, -0.1f);
    scaleTime(15, 5, 60f, 60f);
+15:
    angleVel(-0.125f, 0.0f, -0.125f);
    scaleTime(60, 8, 80f, 80f);
+15:
    angleVel(-0.15f, 0.0f, -0.15f);
+15:
    angleVel(-0.20f, 0.0f, -0.20f);
    scaleTime(30, 8, 120f, 120f);
+15:
    angleVel(-0.25f, 0.0f, -0.25f);
+15:
    scaleTime(15, 3, 0f, 0f);
+15:
    end();
}

script menu_icon {
    layer(14);
    sprite(-1);
    stop();

    case(100); sprite(spring); ins_7();
    case(101); sprite(summer); ins_7();
    case(102); sprite(fall);   ins_7();
    case(103); sprite(winter); ins_7();
    case(104); sprite(doyou);  ins_7();
}

entry entry1 {
    version: 8,
    name: "source/img/front/seasons.png",
    format: 1,
    width: 1024,
    height: 1024,
    memoryPriority: 10,
    lowResScale: 1,
    hasData: 1,
    THTXSize: 4194304,
    THTXFormat: 1,
    THTXWidth: 1024,
    THTXHeight: 1024,
    THTXZero: 0,
    sprites: {
        spring: { x: 832, y: 80, w: 32, h: 32 },
        summer: { x: 864, y: 80, w: 32, h: 32 },
        fall: { x: 896, y: 80, w: 32, h: 32 },
        winter: { x: 928, y: 80, w: 32, h: 32 },
        doyou: { x: 960, y: 80, w: 32, h: 32 },
        releasable: { x: 832, y: 112, w: 64, h: 16 }
    }
}

// Box
script zfront0 {
    sprite(-1);
    layer(20);
    type(1);
    anchor(131073);
    ins_313(2);
    pos(-377.0f, 888.0f, 0.0f);
    ins_612(102.0f, 10.0f);
    color(80, 80, 80);
    alpha(0);
+20: // 20
    alphaTime(20, 0, 255);
    stop();
    case(4);
    alphaTime(5, 0, 255);
    ins_7();
    case(5);
    alphaTime(5, 0, 64);
    ins_7();
    case(1);
    alphaTime(20, 0, 0);
+20: // 40
    end();
}

// FG Fill
script zfront1 {
    sprite(-1);
    layer(20);
    type(1);
    anchor(131073);
    ins_313(2);
    pos(-375.0f, 888.0f, 0.0f);
    drawRect2(100.0f, 8.0f);
    color(64, 64, 255);
    color2(64, 64, 255);
    alpha2(255);
    ins_423(1);
    alpha(0);
    alpha2(0);
    alphaTime(20, 0, 255);
+20: // 20
    alpha2Time(20, 0, 255);
    stop();

    case(8); case(9); case(10); case(11); case(12); case(13);
    color(255, 255, 0);
    color2(255, 255, 255);
    ins_7();

    case(7);
    color(64, 64, 255);
    color2(64, 64, 255);
    ins_7();

    case(4);
    alphaTime(5, 0, 255);
    ins_7();

    case(5);
    alphaTime(5, 0, 64);
    ins_7();

    case(1);
    alphaTime(20, 0, 0);
+20: // 40
    end();
}

// BG Fill
script zfront2 {
    sprite(-1);
    layer(20);
    type(1);
    anchor(131073);
    ins_313(2);
    pos(-375.0f, 888.0f, 0.0f);
    drawRect(100.0f, 8.0f);
    color(64, 64, 255);
    alpha(0);
+20: // 20
    alphaTime(20, 0, 255);
    stop();
    case(8);
    color(64, 64, 255);
    ins_7();
    case(9);
    color(96, 96, 255);
    ins_7();
    case(10);
    color(128, 128, 255);
    ins_7();
    case(11);
    color(144, 144, 255);
    ins_7();
    case(12);
    color(192, 192, 255);
    ins_7();
    case(13);
    color(224, 224, 255);
    ins_7();
    case(4);
    alphaTime(5, 0, 255);
    ins_7();
    case(5);
    alphaTime(5, 0, 64);
    ins_7();
    case(1);
    alphaTime(20, 0, 0);
+20: // 40
    end();
}

// Season name
script zfront3 {
    layer(21);
    sprite(spring);
    ins_307(1);
    anchor(131073);
    ins_313(2);
    pos(-376.0f, 888.0f, 0.0f);
    alpha(0);
//+20: // 20
    alphaTime(20, 0, 255);
    stop();

    case(100); sprite(spring); ins_7();
    case(101); sprite(summer); ins_7();
    case(102); sprite(fall);   ins_7();
    case(103); sprite(winter); ins_7();
    case(104); sprite(doyou);  ins_7();

    case(8); case(9); case(10); case(11); case(12); case(13);
    alphaTime(30, 0, 255);
    stop();
    case(7);
    alphaTime(10, 0, 64);
    stop();
    case(4);
    alphaTime(5, 0, 255);
    ins_7();
    case(5);
    alphaTime(5, 0, 64);
    ins_7();
}

// Releasable
script zfront4 {
    layer(21);
    sprite(releasable);
    ins_307(1);
    anchor(131073);
    ins_313(2);
    pos(-344.0f, 884.0f, 0.0f);
    case(7);
    alpha(0);
    stop();
    case(8); case(9); case(10); case(11); case(12); case(13);
    alphaTime(4, 0, 255);
offset144:
    color(255, 255, 255);
+20: // 20
    color(255, 224, 224);
+20: // 40
    jmp(offset144, 0);
    stop();
    case(4);
    alphaTime(5, 0, 255);
    ins_7();
    case(5);
    // This has a bug in that it causes "Releasable" to suddenly appear
    // even at 0 power if the player gets too close to the bar.
    //
    // I'm leaving the bug in deliberately to stay true to TH16.
    alphaTime(5, 0, 64);
    ins_7();
}
