import { SwordIcon, ShieldIcon } from "../assets/assets"

export default function Character( {info, description, iconcolor} ) {
  return (
    <div className="character-info">
      <h2 className="character-info__name">{info.name}</h2>
      <img className="character-info__img" src={info.img} />
      <div className="character-info__combat">
        <SwordIcon color={iconcolor}/> {info.attack} <ShieldIcon color={iconcolor}/> {info.deffense}
      </div>
      {description && <p className="character-info__info">{description}</p> }
    </div>
  )
}