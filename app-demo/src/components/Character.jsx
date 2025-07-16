
export default function Character( {info, description} ) {
  return (
    <div className="character-info">
      <h2 className="character-info__name">{info.name}</h2>
      <img className="character-info__img" src={info.image} />
      {description && <p className="character-info__info">{description}</p> }
    </div>
  )
}