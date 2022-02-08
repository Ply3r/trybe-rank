import { useContext, useEffect, useState } from "react";
import { infoContext } from "../providers/InfoProvider";
import { Link } from "react-router-dom";
import { fetchUsers } from '../utils/fetch/users';
import '../css/Leaderboard.css';

const Leaderboard = () => {
  const [type, setType] = useState('All');
  const [difficulty, setDificulty] = useState('All')
  const [users, setUsers] = useState([]);
  const { types, token } = useContext(infoContext);

  const getUsers = async () => {
    const leaderboardUsers = await fetchUsers(token);
    setUsers(leaderboardUsers);
  }

  useEffect(() => {
    token && getUsers();
  }, [token]);

  const getPlayers = () => {
    const filterByQuizes = users.filter(({ completed_quizes: completedQuizes }) => completedQuizes.length);
    const getUserAndScore = filterByQuizes.map(({ completed_quizes: completedQuizes, nickname }) => {
      const score = completedQuizes.reduce((acc, curr) => {
        if (type === 'All' && difficulty === 'All') return acc += curr.score;
        if (type === 'All' && difficulty === curr.difficulty) return acc += curr.score;
        if (difficulty === 'All' && type === curr.type) return acc += curr.score;
        if (difficulty === curr.difficulty && type === curr.type) return acc += curr.score;
        return acc;
      }, 0);
      return { nickname, score }
    });
    const getTop10Players = getUserAndScore
      .sort(({ score: a }, { score: b }) => b - a)
      .slice(0, 10);

    return getTop10Players;
  }

  const renderOptions = (option) => {
    let options;

    if (option === 'type') {
      options = types.map(({ name }) => (
        <option key={ `option - ${name}` } value={ name }>{ name }</option>
      ))
    } else {
      const difficulties = ['Iniciante', 'Intermediario', 'Dificil']
      options = difficulties.map((dificulty) => (
        <option key={ `option - ${dificulty}` } value={ dificulty }>{ dificulty }</option>
      ))
    }

    return options;
  }

  const renderLeaderboard = () => {
    const players = getPlayers();
    const rows = players.map(({ nickname, score }, index) => (
      <tr key={ `jogador - ${nickname} / pontuacao - ${ score }` }>
        <td>{ index + 1 + 'º' }</td>
        <td>{ nickname }</td>
        <td>{ score }</td>
      </tr>
    ))

    return (
      <table>
        <thead>
          <tr>
            <th>Top</th>
            <th>Jogador</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    )
  }

  return (
    <>
      <div className="leaderboard-page">
        <h1 className="hero-title">
        { `
          Leaderboard
          ${ type !== 'All' ? ` de ${type}` : '' }
          ${ difficulty !== 'All' ? ` (${difficulty})` : ''}
        ` }
        </h1>
        <div>
          <div className="leaderbord-container">
            <h3>Filtros:</h3>
            <div className="filter-container">
              <label>
                Por tipo:
                <select value={ type } onChange={ ({ target: { value } }) => setType(value) } >
                  <option value={'All'}>All</option>
                  { renderOptions('type') }
                </select>
              </label>
              <label>
                Por dificuldade:
                <select value={ difficulty } onChange={ ({ target: { value } }) => setDificulty(value) } >
                  <option value={'All'}>All</option>
                  { renderOptions('dificulty') }
                </select>
              </label>
            </div>
            <div className="leaderboard">
              { !!users.length && renderLeaderboard() }
            </div>
          </div>
          <div className="next-prev-buttons">
            <Link to="/home">
              <button className="voltar-menu">
                Voltar para Home
              </button>
            </Link>
            <Link to="/select-quiz">
              <button className="voltar-menu">
                Selecionar Quiz
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Leaderboard;