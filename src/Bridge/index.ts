/** https://refactoring.guru/pl/design-patterns/bridge */

export interface Output {
    click(): void;
    move(): void;
    drag(): void;
    zoom(): void;
}

export class Mouse {
    constructor(private readonly t: Output) {}

    click(): void {
        this.t.click();
    }

    move(): void {
        this.t.move()
    }

    down(): void {
        this.t.drag();
    }

    wheel(): void {
        this.t.zoom();
    }
}

export class Gestures {
    constructor(private readonly t: Output) {}

    tap(): void {
        this.t.click();
    }

    swipe(): void {
        this.t.move()
    }

    pan(): void {
        this.t.drag();
    }

    pinch(): void {
        this.t.zoom();
    }
}


export class Screen implements Output {
    click(): void {
        console.log("Screen","click");
    }
    
    move(): void {
        console.log("Screen","move");
    }
    
    drag(): void {
        console.log("Screen","drag");
    }
    
    zoom(): void {
        console.log("Screen","zoom");
    }

}

export class Audio implements Output {
    click(): void {
        console.log("Audio","click");
    }
    
    move(): void {
        console.log("Audio","move");
    }
    
    drag(): void {
        console.log("Audio","drag");
    }
    
    zoom(): void {
        console.log("Audio","zoom");
    }

}

/** USAGE */
export function main(): void {
    const screen = new Screen();
    const screen_gestures = new Gestures(screen);
    screen_gestures.tap();

    const audio = new Audio();
    const audio_mouse = new Mouse(audio);
    audio_mouse.click();
}