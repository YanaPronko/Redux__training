import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createSelector } from "reselect";


import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "./heroesList.scss";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  // const filteredHeroes = useSelector((state) => {
  //   if (state.activeFilter === "all") {
  //     return state.heroes;
  //   } else {
  //     return state.heroes.filter(item => item.element === state.activeFilter);
  //   }
  // });

  // Так как в state теперь у нас 2 объекта, то надо обращаться к конкретному
  // а еще у нас даже при одинаковых данных, но если сработал триггер функия useSelector вызывается
  // и весь фильтрованный список рисуется заново
  // поэтому надо использовать библиотеку reselect

  const filteredHeroesSelector = createSelector(
    (state) => state.filtersReducer.activeFilter,
    (state) => state.heroesReducer.heroes,
    (activeFilter, heroes) => {
      if (activeFilter === "all") {
        console.log("render");
        return heroes;
      } else {
        return heroes.filter((item) => item.element === activeFilter);
      }
    }
  );

  // const filteredHeroes = useSelector((state) => {
  //   if (state.filtersReducer.activeFilter === "all") {
  //     console.log("render");
  //     return state.heroesReducer.heroes;
  //   } else {
  //     return state.heroesReducer.heroes.filter((item) => item.element === state.filtersReducer.activeFilter);
  //   }
  // });

  const filteredHeroes = useSelector(filteredHeroesSelector)
  const heroesLoadingStatus = useSelector((state) => state.heroesReducer.heroesLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    // dispatch(heroesFetching());
    dispatch(heroesFetching);

    // dispatch("HEROES_FETCHING")
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  // Функция берет id и по нему удаляет ненужного персонажа из store
  // ТОЛЬКО если запрос на удаление прошел успешно
  // Отслеживайте цепочку действий actions => reducers
  const onDelete = useCallback(
    (id) => {
      // Удаление персонажа по его id
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then((data) => console.log(data, "Deleted"))
        .then(dispatch(heroDeleted(id)))
        .catch((err) => console.log(err));
      // eslint-disable-next-line
    },
    [request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} className="hero">
          <HeroesListItem {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
