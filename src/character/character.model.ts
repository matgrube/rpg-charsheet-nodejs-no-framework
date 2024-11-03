export type Character = {
    name: string,
    race: string,
    charClass: string,
    level: number,
    exp: number,
    hpCurrent: number,
    hpMax: number,
    user_id: string,
}

export type CharacterDTO = Character & {id: string}