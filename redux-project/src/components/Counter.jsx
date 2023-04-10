import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { inc, dec, rnd } from '../actions';
import * as actions from '../actions';



// const Counter = ({counter, inc, dec, rnd}) => {
//     const counter = useSelector(state => state.value);

//     return (
//         <div className="jumbotron">
//             <h1>{counter}</h1>
//             <button onClick={dec} className="btn btn-primary">DEC</button>
//             <button onClick={inc} className="btn btn-primary">INC</button>
//             <button onClick={rnd} className="btn btn-primary">RND</button>
//         </div>
//     )
// }
const Counter = () => {
  // useSelector -будет перерендеривать компонент, если поменятеся хоть что-то в общем state
  //  то есть если мы вытащим объект, а не конкретное значение из state, в итоге при
  // изменении 1 части объекта, меняется ссылка=> меняется state => перерендер
  // Решение: вытаскивать каждую значение в отдельную переменную
  // то есть использовать useSelector((state) => state.value); столько раз сколько нужно
    // либо reselect или shallow что-то там(доку смотри)
    const counter = useSelector((state) => state.value);

    // если наш dispatch передается в дочерний компонент, надо обернуть в useCallback
    // чтобы не вызывать лишних перерендеров
  const dispatch = useDispatch();

  return (
    <div className="jumbotron">
      <h1>{counter}</h1>
      <button onClick={() => dispatch(dec())} className="btn btn-primary">
        DEC
      </button>
      <button onClick={() => dispatch(inc())} className="btn btn-primary">
        INC
      </button>
      <button onClick={() => dispatch(rnd())} className="btn btn-primary">
        RND
      </button>
    </div>
  );
};


// const mapStateToProps = (state) => {
//     return {
//         counter: state.value
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     // const { inc, dec, rnd } = bindActionCreators(actions, dispatch);
//     // т.к. по сути у нас объект стал просто перечислением того, что возвращает bindActionsCreators
//     // то можно переделать функцию
//     return bindActionCreators(actions, dispatch);

//     // return {
//     //     inc,
//     //     dec,
//     //     rnd
//     //     // rnd: () => {
//     //     //     // Можно вычисление value перенсти в actions и тогда объект упростится
//     //     //     const value = Math.floor(Math.random() * 10);
//     //     //     rnd(value);
//     //     // }
//     // };
//     // return {
//     //     inc: () => dispatch(inc()),
//     //     dec: () => dispatch(dec()),
//     //     rnd: () => {
//     //         const value = Math.floor(Math.random() * 10);
//     //         dispatch(rnd(value));
//     //     }
//     // }
// }
// Но так как функция connect под капотом в случае, если в качестве 2го параметра принимает объект
// сама оборачивает тогда actions в dispatсh, то нет смысла вообще вручную это делать
//  и в итоге mapDispatchToProps нам не нужна, мы передаем просто actions

// export default connect(mapStateToProps, actions)(Counter);
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
export default Counter;