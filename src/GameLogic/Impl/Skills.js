import DAMAGE_TYPE from "../Constants/DAMAGE_TYPE";
import TARGET_TYPE from "../Constants/TARGET_TYPE";

const Sparks = {
    skillName: 'Sparks',
    damageRoll: '4d3',
    damageType: DAMAGE_TYPE.LIGHTNING_DAMAGE,
    apCost: 2,
    description: 'Sparks and more sparks, a common skills used my mages around the new year..',
    targetType: TARGET_TYPE.SINGLE_TARGET,
}

const Fireball = {
    skillName: 'Fireball',
    damageRoll: '1d12',
    damageType: DAMAGE_TYPE.FIRE_DAMAGE,
    apCost: 2,
    description: 'Summons a burning ball of fire',
    targetType: TARGET_TYPE.SINGLE_TARGET,
}

const Cure  = {
    skillName: 'Cure',
    damageRoll: '1d12',
    damageType: DAMAGE_TYPE.HEALING,
    apCost: 2,
    description: 'Use the restorative forces of the aether to heal an ally',
    targetType: TARGET_TYPE.SINGLE_TARGET,
}

export { Sparks, Fireball, Cure }