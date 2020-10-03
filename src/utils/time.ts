import * as Phaser from 'phaser';

export const secondsToMinutes = (seconds) =>
    Phaser.Math.FloorTo(seconds / 60) + ':' + ('0' + Phaser.Math.FloorTo(seconds % 60)).slice(-2);
