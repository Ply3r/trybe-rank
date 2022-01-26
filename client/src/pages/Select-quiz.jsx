import { useState, useContext, useEffect } from 'react';
import { gameContext } from '../providers/GameProvider';
import { infoContext } from '../providers/InfoProvider';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import TypeCard from '../components/typeCard';
import SelectDificulty from '../components/SelectDificulty';
import '../css/Select-page.css';

const SelectQuiz = () => {
  const [cards, setCards] = useState([]);
  const [active, setActive] = useState(null);
  const { questoes, tipos } = useContext(infoContext)
  const { resetGame } = useContext(gameContext);

  const createCards = () => {
    const selectedCards = cards.slice(0, 3)
    const hold = selectedCards.map(({nome, cor, dificuldade}, index) => {
      const quantity = questoes.filter(({ tipo }) => tipo === nome).length
      return (
        <TypeCard
          key={ `typeCard - ${index}` }
          id={ nome }
          name={ nome }
          color={ cor }
          quantity={ quantity }
          dificulty={ dificuldade }
          selected={ index === 1 }
          setActive={ setActive }
        />
      )
    });
    return hold;
  };

  const renderCardActive = () => {
    const { nome, cor, dificuldade } = tipos.find(({ nome }) => nome === active);
    const quantity = questoes.filter((question) => question.tipo === nome).length;
    return (
      <>
        <div
          onClick={ () => {
            setActive(null);
          } }
          className="backpage on-active-card"
        />
        <div className="active-card">
          <TypeCard
            name={ nome }
            color={ cor }
            quantity={ quantity }
            dificulty={ dificuldade }
            jogar
            selected={ active }
            setActive={ setActive }
          />
          <SelectDificulty color={ cor } />
        </div>
      </>
    )
  }

  const nextCard = () => {
    const firstCard = cards[0];
    const newCard = cards.slice(1)
    setCards([...newCard, firstCard])
  }

  const prevCard = () => {
    const lastIndex = cards.length - 1;
    const lastCard = cards[lastIndex];
    const newCard = [...cards].slice(0, lastIndex)
    setCards([lastCard, ...newCard])
  }

  useEffect(() => {
    setCards(tipos)
    resetGame();
  }, [])

  return (
    <>
      <div className="select-page">
        <h1 className="hero-title">Seleção de Quiz</h1>
        <div className="type-cards-container">
          { active && renderCardActive() }
          <button
            className="select-buttons"
            onClick={ prevCard }
          >
            <FiChevronLeft />
          </button>
          { cards && createCards() }
          <button
            className="select-buttons"
            onClick={ nextCard }
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </>
  )
};

export default SelectQuiz;