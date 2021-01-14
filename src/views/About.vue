<template>
  <div class="info">
    <nav class="nav">
      <div class="nav__category">
        <h3 class="nav__title">Классификации</h3>
        <ul class="nav__list">
          <li class="nav__element">
            <span>Рефлюкс-эзофагит</span>
            <ul class="nav__sublist">
              <li class="nav__subitem" data-name="reflux-la">Лос-Анджелесская</li>
              <li class="nav__subitem" data-name="reflux-savary">Savary-Miller</li>
            </ul>
          </li>
        </ul>

        <ul class="nav__list">
          <li class="nav__element">
            <span>ВРВП</span>
            <ul class="nav__sublist">
              <li class="nav__subitem" data-name="vrvp-paquet">K.J. Paquet (1983)</li>
              <li class="nav__subitem" data-name="vrvp-soehendra">N. Soehendra и K. Binmoeller (1997)</li>
            </ul>
          </li>
        </ul>

        <ul class="nav__list">
          <li class="nav__element">
            <span>Неоплазии</span>
            <ul class="nav__sublist">
              <li class="nav__subitem" data-name="tumor-paris">Парижская классификация(2002)</li>
              <li class="nav__subitem" data-name="tumor-nice">NICE</li>
              <li class="nav__subitem" data-name="tumor-kudo">Pit Pattern</li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <div class="info__content">
      <div class="info__wrapper">
        <section class="classification">
          <h2 class="title">Рефлюкс-эзофагит</h2>
          <div class="classification__item">
            <h3 class="classification__subtitle" data-target="reflux-la">Лос-Анджелесская классификация</h3>
            <table class="classification__table">
              <tr>
                <th>Степень</th>
                <th>Эндоскопическая картина</th>
              </tr>
              <tr>
                <td>Степень A</td>
                <td>
                  Одно (или более) поражение слизистой оболочки (эрозия или
                  изъязвление) длиной менее 5 мм, ограниченное пределами складки
                  слизистой оболочки.
                </td>
              </tr>
              <tr>
                <td>Степень B</td>
                <td>
                  Одно (или более) поражение слизистой оболочки длиной более 5 мм,
                  ограниченное пределами складки слизистой оболочки.
                </td>
              </tr>
              <tr>
                <td>Степень C</td>
                <td>
                  Поражение слизистой оболочки распространяется на 2 и более складки
                  слизистой оболочки, но занимает менее 75% окружности пищевода.
                </td>
              </tr>
              <tr>
                <td>Степень D</td>
                <td>
                  Поражение слизистой оболочки распространяется на 75% и более
                  окружности пищевода.
                </td>
              </tr>
            </table>
          </div>

          <div class="classification__item">
            <h3 class="classification__subtitle" data-target="reflux-savary">Классификация по Savary-Miller</h3>
            <table class="classification__table">
              <tr>
                <th>Степень</th>
                <th>Эндоскопическая картина</th>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  Отдельные не сливающиеся эрозии и/или эритема дистального отдела
                  пищевода.
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  Сливающиеся, но не захватывающие большую часть слизистой оболочки
                  эрозии.
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  Эрозивные поражения нижней трети пищевода, сливающиеся и
                  охватывающие всю поверхность слизистой оболочки пищевода.
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  Хроническая язва пищевода, цилиндрическая (желудочная или
                  кишечная) метаплазия слизистой оболочки пищевода (пищевод
                  Баррета).
                </td>
              </tr>
            </table>
          </div>
        </section>    

        <section class="classification">
          <h2 class="title">Варикозное расширение вен пищевода</h2>
          <div class="classification__item">
            <h3 class="classification__subtitle" data-target="vrvp-paquet">Классификация K.J. Paquet (1983)</h3>
            <table class="classification__table">
              <tr>
                <th>Степень</th>
                <th>Эндоскопическая картина</th>
              </tr>
              <tr>
                <td>I</td>
                <td>
                  единичные эктазии вен (верифицируются эндоскопически, но не определяются рентгенологически)
                </td>
              </tr>
              <tr>
                <td>II</td>
                <td>
                  единичные хорошо отграниченные стволы вен, преимущественно в нижней трети пищевода, которые при инсуффляции воздуха отчетливо выражены. Просвет пищевода не сужен, слизистая оболочка пищевода над расширенными венами не истончена;
                </td>
              </tr>
              <tr>
                <td>III</td>
                <td>
                  просвет пищевода сужен за счет выбухания ВРВ в нижней и средней третях пищевода, которые частично спадаются при инсуффляции воздуха. На верхушках ВРВ определяются единичные красные маркеры или ангиоэктазии;
                </td>
              </tr>
              <tr>
                <td>IV</td>
                <td>
                  в просвете пищевода множественные варикозные узлы, не спадающиеся при сильной инсуффляции воздуха. Слизистая оболочка над венами истончена. На верхушках вариксов определяются множественные эрозии и/или ангиоэктазии (супервариксы).
                </td>
              </tr>
            </table>
          </div>

          <div class="classification__item">
            <h3 class="classification__subtitle" data-target="vrvp-soehendra">Классификация N. Soehendra и K. Binmoeller(1997)</h3>
            <table class="classification__table">
              <tr>
                <th>Степень</th>
                <th>Эндоскопическая картина</th>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  диаметр вен не превышает 5 мм, вытянутые, располагаются только в нижней трети пищевода;
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  диаметр вен от 5 до 10 мм, извитые, расположены в средней трети пищевода;
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  диаметр более 10 мм, напряженные, с тонкой стенкой, расположены вплотную друг к другу, на поверхности вен «красные маркеры».
                </td>
              </tr>
            </table>
          </div>
        </section>

        <section class="classification">
          <h2 class="title">Неоплазии</h2>
          <div class="classification__item">
            <h3 class="classification__subtitle" data-target="tumor-paris">Парижская классификация(2002)</h3>
            <table class="classification__table">
              <tr>
                <th>Тип</th>
                <th>Описание</th>
              </tr>
              <tr>
                <td>Тип 0</td>
                <td>
                  поверхностные полиповидные, плоские/углубленные,
                  или подрытые опухоли
                </td>
              </tr>
              <tr>
                <td>Тип 1</td>
                <td>
                  полиповидный рак, как правило, на широком основании
                </td>
              </tr>
              <tr>
                <td>Тип 2</td>
                <td>
                  язвенная форма рака с четкими границами и приподнятыми краями
                </td>
              </tr>
              <tr>
                <td>Тип 3</td>
                <td>
                  язвенно-инфильтративная форма рака без определенных границ
                </td>
              </tr>
              <tr>
                <td>Тип 4</td>
                <td>
                  неязвенная, диффузная инфильтративная форма рака
                </td>
              </tr>
              <tr>
                <td>Тип 5</td>
                <td>
                  неклассифицируемый прогрессирующий рак
                </td>
              </tr>
            </table>
          </div>

          <div class="classification__item">
            <h3 class="classification__subtitle">Парижская эндоскопическая классификация поверхностных
    опухолевых новообразований ЖКТ типа 0 (2002)</h3>
            <img class="classification__image" src="../assets/images/paris.jpg" alt="парижская классификация">
          </div>

          <div class="classification__item">
            <h3 class="classification__subtitle" data-target="tumor-nice">Классификация NICE</h3>
            <table class="classification__table">
              <tr>
                <th>Тип</th>
                <th>Цвет</th>
                <th>Сосуды</th>
                <th>Рельеф слизистой</th>
                <th>Вероятная морфологическая
                структура образования</th>
              </tr>
              <tr>
                <td>Тип 1</td>
                <td>
                  Такой же, либо светлее окружающей слизистой
                </td>
                <td>
                  Не изменены или изолированные
                  кружевные сосуды, расположенные
                  вокруг пораженного участка
                </td>
                <td>
                  Темные или белые точки одинакового
                  размера, равномерный рисунок
                  слизистой
                </td>
                <td>
                  Гиперплазия
                </td>
              </tr>

              <tr>
                <td>Тип 2</td>
                <td>
                  Более коричневый, чем окружающая
                  слизистая (сравнить цвет с
                  расположенными рядом сосудами)
                </td>
                <td>
                  Толстые коричневые сосуды,
                  окруженные белыми структурами
                </td>
                <td>
                  Овальные, тубулярные или ветвистые
                  структуры в окружении коричневых
                  сосудов
                </td>
                <td>
                  Аденома
                </td>
              </tr>

              <tr>
                <td>Тип 3</td>
                <td>
                  От коричневого до темно-коричневого
                  по отношению к окружающей
                  слизистой; иногда присутствуют
                  бессосудистые зоны белого цвета
                </td>
                <td>
                  Имеются области с заметно
                  искривленными сосудами или их
                  отсутствием
                </td>
                <td>
                  Бесструктурный или отсутствующий
                  поверхностный рисунок
                </td>
                <td>
                  Инвазивный рак
                </td>
              </tr>          
            </table>
            <img class="classification__image" src="../assets/images/nice.jpg" alt="nice">

          </div>

          <div class="classification__item">
            <h3 class="classification__subtitle" data-target="tumor-kudo">Классификация pit pattern</h3>
            
            <img class="classification__image" src="../assets/images/kudo.png" alt="kudo">

          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill';
export default {
  mounted() {
    this.menuScroll()
  },
  methods: {
    menuScroll() {
      const menuItems = document.querySelectorAll('.nav__subitem')
      smoothscroll.polyfill();

      menuItems.forEach(item => {
        item.addEventListener('click', () => {
          const target = document.querySelector(`[data-target="${item.getAttribute('data-name')}"]`)

          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth"
          })
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  padding-bottom: 40px;
  background-color: #ffffff;
}

.classification {
  padding-top: 40px;
  padding-bottom: 40px;
}

.classification__image {
  width: 80%;
  margin-top: 40px;
}

.classification__table {
  margin-top: 40px;
  border-collapse: collapse;
  width: 100%;

  & th,
  & td {
    border: 2px solid #444a4e;
    padding: 8px;
  }
}

.classification__item {
  margin-top: 40px;
}

.classification__subtitle {
  text-align: left;
}

.info__content {
  width: 100%;
  margin-left: 270px;
}

.info__wrapper {
  width: 800px;
  margin: 0 auto;
}

.nav {
  position: fixed;
  top: 120px;
  left: 0;
  width: 260px;
  border: 3px solid #d4e9f7;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  overflow: scroll;
}

.nav__title {
  position: relative;
  font-family: inherit;
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 30px;

  &::after {
    position: absolute;
    content: "";
    bottom: -15px;
    left: 0;
    height: 3px;
    width: 80px;
    background-color: #656f75;
  }
}

.nav__list {
  width: 100%;
}

.nav__element {
  width: 100%;
  font-size: 16px;
  & span {
    display: block;
    width: 100%;
    background-color: #d4e9f7;
    padding: 5px;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: #bcd5e5;
      transition: 0.3s ease-in-out;
    }
  }
}

.nav__sublist {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  background-color: #f2f2f2;
}

.nav__subitem{
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
