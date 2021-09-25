import Utils from "./Utils";
import {MOB_TABLE} from "../Constants/MOB_TABLE";
import battle_scene1a from "../Impl/Scenes/battle_scene1a";

export default class BattleGenerator {

    static GenerateBattle(zone) {
        let mobSet =  MOB_TABLE[zone]

        let ranInt = (Utils.Roll(mobSet.length) -1 )
        let enemies = []
        mobSet[ranInt].forEach(e => {
            enemies.push(new e())
        });
        let scene = new battle_scene1a(enemies)
        scene.enemies = enemies
        return scene
    }

    static GenerateBattles(zone, numBattles) {
        let scenes = []
        for(let i = 0;i < numBattles;i++) {
            scenes.push(this.GenerateBattle(zone))
        }
        return scenes
    }
}