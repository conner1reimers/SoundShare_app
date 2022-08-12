export const squigglyPhaser = 
    new Tone.Phaser
         ({
                    frequency: 7,
                    octaves: 3,
                    baseFrequency: 1000
            });
export const tooHeavyPhaser = 
            new Tone.Phaser({
                    frequency: 20,
                    octaves: 5,
                    baseFrequency: 500
            })

            
export const slightDelay = new Tone.PingPongDelay('32n', .01)

export const slightDelay = new Tone.PingPongDelay('32n', .01)
export const biggerDelay = new Tone.PingPongDelay('8t', .51).toDestination();
export const defaultChorus = new Tone.Chorus(4, 2.5, 0.5);
