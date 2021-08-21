function ImagePopup(props) {
  const onClose = props.onClose;
  return (
    <section className={`popup popup_full-image ${props.card.link ? `popup_opened` : ""}`}>
      <div className="popup__container popup__container_type_image">
        <img src={props.card.link} alt={props.card.name} className="popup__image" />
        <p className="popup__description">{props.card.name}</p>
        <button onClick={onClose} className="popup__btn popup__btn_type_image" type="button"></button>
      </div>
    </section>
  );
}
  
export default ImagePopup;
