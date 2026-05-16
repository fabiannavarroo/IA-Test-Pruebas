import React, { useMemo, useState } from "react";

const exams = [
  {
    id: "modelo-1",
    title: "Modelo 1 — Simulacro general",
    subtitle: "Base: sistemas de producción, búsqueda, incertidumbre, RB, Markov, MDP, borrosa, ML, bio y robótica.",
    questions: [
      {
        id: "m1q1",
        topic: "Sistemas de producción",
        statement: "En un sistema de producción, la Base de Hechos o Memoria de Trabajo representa:",
        options: {
          a: "El conjunto de reglas aplicables en cada ciclo.",
          b: "El conocimiento sobre el dominio en un momento determinado.",
          c: "La estrategia usada para elegir una regla del conjunto conflicto.",
          d: "El conjunto de hechos que se consideran ciertos en ese instante."
        },
        correct: ["b", "d"],
        explanation: "La BH/WM almacena los hechos actuales del dominio; por tanto, contiene lo que el sistema considera cierto en ese instante. Las reglas están en la BR, y la estrategia de selección pertenece al motor de inferencia."
      },
      {
        id: "m1q2",
        topic: "Sistemas de producción",
        statement: "Sobre las reglas de producción, marque las afirmaciones correctas:",
        options: {
          a: "Suelen tener formato SI condiciones ENTONCES acciones.",
          b: "La parte izquierda contiene las condiciones de aplicación.",
          c: "La parte derecha puede modificar la memoria de trabajo.",
          d: "Una regla siempre debe contener una estructura if-then-else."
        },
        correct: ["a", "b", "c"],
        explanation: "Una regla tiene condiciones en el antecedente y acciones en el consecuente. No se usa if-then-else como estructura obligatoria; de hecho, en sistemas de producción se separan las reglas."
      },
      {
        id: "m1q3",
        topic: "Ciclo de inferencia",
        statement: "En el ciclo básico de un sistema de producción, ¿qué pasos aparecen normalmente?",
        options: {
          a: "Equiparación de reglas con la memoria de trabajo.",
          b: "Construcción del conjunto conflicto o agenda.",
          c: "Resolución de conflictos para elegir una regla.",
          d: "Ejecución de la regla seleccionada."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "El ciclo completo compara reglas con hechos, construye la agenda, decide qué regla aplicar y ejecuta sus efectos."
      },
      {
        id: "m1q4",
        topic: "Mundo cerrado y refracción",
        statement: "Marque las afirmaciones correctas:",
        options: {
          a: "En mundo cerrado, lo que no aparece en la Base de Hechos se considera falso.",
          b: "La refracción evita aplicar repetidamente la misma regla con los mismos valores de variables.",
          c: "Si una regla solo añade hechos, el razonamiento puede considerarse monótono.",
          d: "En un sistema de producción, todas las reglas se ejecutan siempre en cada ciclo."
        },
        correct: ["a", "b", "c"],
        explanation: "El sistema elige una regla por ciclo. Mundo cerrado y refracción son conceptos clave; el razonamiento monótono no elimina información, solo añade."
      },
      {
        id: "m1q5",
        topic: "Búsqueda no informada",
        statement: "En un problema de búsqueda, para definir formalmente el problema es necesario indicar:",
        options: {
          a: "Estado inicial.",
          b: "Estado o estados objetivo.",
          c: "Operadores o acciones posibles.",
          d: "Siempre una función heurística."
        },
        correct: ["a", "b", "c"],
        explanation: "La heurística solo es necesaria en búsqueda informada. Un problema de búsqueda básico se define con estados, operadores, inicial y meta."
      },
      {
        id: "m1q6",
        topic: "Búsqueda en amplitud",
        statement: "Sobre la búsqueda en amplitud, marque las correctas:",
        options: {
          a: "Expande primero los nodos de menor profundidad.",
          b: "Utiliza una estructura tipo cola FIFO.",
          c: "Si todos los costes son iguales, encuentra una solución óptima en número de pasos.",
          d: "Siempre ocupa menos memoria que la búsqueda en profundidad."
        },
        correct: ["a", "b", "c"],
        explanation: "Amplitud trabaja por niveles y usa cola FIFO. Suele consumir mucha memoria porque guarda la frontera completa."
      },
      {
        id: "m1q7",
        topic: "Búsqueda en profundidad",
        statement: "Sobre la búsqueda en profundidad, marque las correctas:",
        options: {
          a: "Puede quedar atrapada en ramas infinitas si no hay control.",
          b: "Usa una estrategia tipo pila LIFO.",
          c: "Garantiza siempre encontrar la solución óptima.",
          d: "Puede consumir menos memoria que la búsqueda en amplitud."
        },
        correct: ["a", "b", "d"],
        explanation: "Profundidad baja por una rama antes de retroceder. No garantiza optimalidad y puede caer en ciclos o ramas infinitas."
      },
      {
        id: "m1q8",
        topic: "Coste uniforme / Dijkstra",
        statement: "Cuando los costes de las acciones no son uniformes, el algoritmo de coste uniforme/Dijkstra:",
        options: {
          a: "Expande el nodo con menor coste acumulado g(n).",
          b: "Garantiza optimalidad si los costes son no negativos.",
          c: "Usa exclusivamente la heurística h(n).",
          d: "Puede encontrar soluciones con menor coste aunque tengan más pasos."
        },
        correct: ["a", "b", "d"],
        explanation: "Dijkstra se guía por g(n), no por h(n). Al minimizar coste acumulado, puede preferir un camino más largo en pasos pero más barato."
      },
      {
        id: "m1q9",
        topic: "Heurísticas",
        statement: "Una heurística admisible es aquella que:",
        options: {
          a: "Nunca sobreestima el coste real hasta el objetivo.",
          b: "Siempre da exactamente el coste real.",
          c: "Puede utilizarse en A* para garantizar optimalidad bajo las condiciones adecuadas.",
          d: "Siempre hace que el algoritmo explore menos nodos que cualquier otra heurística."
        },
        correct: ["a", "c"],
        explanation: "Admisible significa optimista: no se pasa del coste real. No tiene por qué ser exacta ni siempre la más eficiente."
      },
      {
        id: "m1q10",
        topic: "A*",
        statement: "En el algoritmo A*, marque las afirmaciones correctas:",
        options: {
          a: "Se usa normalmente f(n) = g(n) + h(n).",
          b: "g(n) representa el coste acumulado desde el nodo inicial hasta n.",
          c: "h(n) representa una estimación del coste desde n hasta la meta.",
          d: "A* ignora los costes reales de las acciones."
        },
        correct: ["a", "b", "c"],
        explanation: "A* combina coste real acumulado y estimación heurística. Justamente no ignora los costes reales."
      },
      {
        id: "m1q11",
        topic: "Escalada / Hill-Climbing",
        statement: "Sobre el algoritmo de escalada, marque las correctas:",
        options: {
          a: "Selecciona sucesores en función de la heurística.",
          b: "Puede caer en óptimos locales.",
          c: "Siempre garantiza encontrar la solución óptima.",
          d: "Puede ser más rápido que otros métodos, pero menos seguro."
        },
        correct: ["a", "b", "d"],
        explanation: "Escalada es voraz respecto a la heurística. Puede ser rápida, pero no garantiza solución ni optimalidad."
      },
      {
        id: "m1q12",
        topic: "Probabilidad",
        statement: "Sean dos sucesos A y B. Marque las fórmulas correctas:",
        options: {
          a: "P(A|B) = P(A ∩ B) / P(B), si P(B) > 0.",
          b: "P(A ∩ B) = P(A|B)P(B).",
          c: "P(A|B) = P(B|A)P(A) / P(B), si P(B) > 0.",
          d: "P(A|B) = P(A) siempre."
        },
        correct: ["a", "b", "c"],
        explanation: "Son definición de probabilidad condicional, regla del producto y Bayes. P(A|B)=P(A) solo si A y B son independientes."
      },
      {
        id: "m1q13",
        topic: "Incertidumbre",
        statement: "Marque las afirmaciones correctas:",
        options: {
          a: "La lógica clásica trabaja con valores verdadero/falso.",
          b: "La probabilidad permite representar incertidumbre sobre si algo ocurre.",
          c: "La lógica borrosa representa grados de pertenencia a conceptos vagos.",
          d: "Probabilidad y lógica borrosa significan exactamente lo mismo."
        },
        correct: ["a", "b", "c"],
        explanation: "Probabilidad mide incertidumbre sobre eventos; lógica borrosa mide grado de pertenencia o verdad de conceptos vagos."
      },
      {
        id: "m1q14",
        topic: "Redes bayesianas",
        statement: "En una red bayesiana:",
        options: {
          a: "Los nodos representan variables aleatorias.",
          b: "Los arcos representan dependencias directas.",
          c: "Cada nodo tiene asociada una tabla de probabilidad, condicionada por sus padres si los tiene.",
          d: "Todos los nodos deben depender directamente de todos los demás."
        },
        correct: ["a", "b", "c"],
        explanation: "La gracia de una red bayesiana es representar solo dependencias relevantes, no conectar todo con todo."
      },
      {
        id: "m1q15",
        topic: "Inferencia en redes bayesianas",
        statement: "Cuando se realiza inferencia en una red bayesiana, normalmente:",
        options: {
          a: "Se calcula una probabilidad de consulta dada cierta evidencia.",
          b: "Las variables no observadas pueden tratarse como variables ocultas y sumarse.",
          c: "Puede utilizarse un factor de normalización α.",
          d: "No es necesario conocer ninguna probabilidad condicional."
        },
        correct: ["a", "b", "c"],
        explanation: "La inferencia calcula posteriores. Las ocultas se eliminan por suma y α normaliza. Sin TPC no se puede calcular."
      },
      {
        id: "m1q16",
        topic: "Markov y HMM",
        statement: "Marque las afirmaciones correctas:",
        options: {
          a: "Una cadena de Markov representa una secuencia de estados a lo largo del tiempo.",
          b: "La propiedad de Markov indica que el futuro es independiente del pasado dado el presente.",
          c: "Un HMM incluye estados ocultos y variables de observación/evidencia.",
          d: "En un HMM no existen probabilidades de emisión."
        },
        correct: ["a", "b", "c"],
        explanation: "El HMM añade observaciones al modelo de Markov mediante probabilidades de emisión P(Ei|Xi)."
      },
      {
        id: "m1q17",
        topic: "MDP",
        statement: "Un Proceso de Decisión de Markov puede definirse mediante:",
        options: {
          a: "Un conjunto de estados S.",
          b: "Un conjunto de acciones A.",
          c: "Probabilidades de transición.",
          d: "Costes o recompensas asociadas a acciones/estados."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Un MDP necesita estados, acciones, modelo de transición y función de coste/recompensa."
      },
      {
        id: "m1q18",
        topic: "Bellman y política óptima",
        statement: "En un MDP con costes, marque las afirmaciones correctas:",
        options: {
          a: "Una política indica qué acción tomar en cada estado.",
          b: "La política óptima minimiza el coste esperado o maximiza la recompensa esperada.",
          c: "Las ecuaciones de Bellman permiten calcular valores de los estados.",
          d: "El estado meta suele tener valor 0 si trabajamos con costes."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "La política mapea estados a acciones. Bellman estima el valor esperado; con costes, una meta absorbente suele valer 0."
      },
      {
        id: "m1q19",
        topic: "Lógica borrosa",
        statement: "Sobre lógica borrosa, marque las correctas:",
        options: {
          a: "Los valores de pertenencia están en el intervalo [0,1].",
          b: "La borrosificación transforma entradas nítidas en grados de pertenencia.",
          c: "En inferencia max-min, una conjunción AND suele calcularse con el mínimo.",
          d: "La defuzzificación transforma una salida borrosa en un valor nítido."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Son las fases y operadores básicos de Mamdani: borrosificar, aplicar reglas, agregar y deborrosificar."
      },
      {
        id: "m1q20",
        topic: "ML, bioinspiradas y robótica",
        statement: "Marque las afirmaciones correctas:",
        options: {
          a: "El aprendizaje supervisado usa datos etiquetados.",
          b: "En una red neuronal, el aprendizaje implica ajustar pesos.",
          c: "En algoritmos genéticos aparecen selección, cruce y mutación.",
          d: "En robótica, los sensores captan información del entorno y los actuadores ejecutan acciones."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Las cuatro afirmaciones resumen bloques finales del temario: ML, redes neuronales, algoritmos genéticos y robótica."
      }
    ]
  },
  {
    id: "modelo-2",
    title: "Modelo 2 — Producción, representación y búsqueda",
    subtitle: "Más orientado a T2-T4 y preguntas parecidas a parciales.",
    questions: [
      {
        id: "m2q1",
        topic: "Reglas de producción",
        statement: "En el problema clásico del lobo, la oveja y la col, una regla correcta para mover la oveja de X a Y debe incluir:",
        options: {
          a: "Que la barca esté en X.",
          b: "Que la oveja esté en X.",
          c: "Que exista la relación opposite(X,Y).",
          d: "Que se añada la oveja en Y sin eliminarla de X."
        },
        correct: ["a", "b", "c"],
        explanation: "Hay que comprobar que barca y oveja están en el origen y que Y es la orilla opuesta. Si no se elimina sheep(X), la oveja aparecería en dos lugares."
      },
      {
        id: "m2q2",
        topic: "Reglas y hechos estáticos",
        statement: "En una representación con predicados como opposite(left,right), marque las correctas:",
        options: {
          a: "opposite puede tratarse como un hecho estático del dominio.",
          b: "Una regla de movimiento no debería modificar opposite.",
          c: "opposite describe una relación fija entre localizaciones.",
          d: "opposite debe eliminarse cada vez que se mueve la barca."
        },
        correct: ["a", "b", "c"],
        explanation: "Los hechos estáticos describen el mapa o relaciones fijas. No cambian por la acción; lo que cambia es dónde están los objetos."
      },
      {
        id: "m2q3",
        topic: "ASSERT/RETRACT",
        statement: "Si una regla tiene como consecuente '+c(manuel), -a(manuel)', significa que:",
        options: {
          a: "Se añade c(manuel) a la BH.",
          b: "Se elimina a(manuel) de la BH.",
          c: "Se añade a(manuel) por refracción.",
          d: "La regla modifica la memoria de trabajo."
        },
        correct: ["a", "b", "d"],
        explanation: "+ es ASSERT y - es RETRACT. Esto altera la BH y puede cambiar qué reglas se activan en el siguiente ciclo."
      },
      {
        id: "m2q4",
        topic: "Agenda y conflicto",
        statement: "Si varias instancias de regla son aplicables en un ciclo, el sistema debe:",
        options: {
          a: "Construir el conjunto conflicto o agenda.",
          b: "Elegir una mediante la estrategia de resolución de conflictos.",
          c: "Ejecutarlas todas obligatoriamente en paralelo.",
          d: "Actualizar la BH tras ejecutar la regla seleccionada."
        },
        correct: ["a", "b", "d"],
        explanation: "El modelo de ejecución visto en clase aplica una regla por ciclo. Después se actualiza la BH y se recalcula o actualiza la agenda."
      },
      {
        id: "m2q5",
        topic: "FIFO/LIFO",
        statement: "En la estrategia 'más antigua' aplicada a una agenda de reglas, se selecciona:",
        options: {
          a: "La primera instancia que entró en la agenda.",
          b: "Una estrategia equivalente a FIFO.",
          c: "La última instancia generada.",
          d: "Una estrategia equivalente a LIFO."
        },
        correct: ["a", "b"],
        explanation: "Más antigua = FIFO. Más nueva = LIFO. Confundirlas cambia todo el orden de ejecución."
      },
      {
        id: "m2q6",
        topic: "Representación de estados",
        statement: "Al representar un problema de búsqueda, un estado debe incluir:",
        options: {
          a: "Toda la información necesaria para distinguirlo de otros estados relevantes.",
          b: "Solo una letra, aunque existan cargas, posiciones y objetos distintos.",
          c: "La posición del agente si esa posición afecta a las acciones.",
          d: "El estado de objetos que puedan cambiar y afectar al problema."
        },
        correct: ["a", "c", "d"],
        explanation: "Tus ejercicios insisten en no representar dos situaciones distintas igual. Hay que incluir todo lo que los operadores pueden usar."
      },
      {
        id: "m2q7",
        topic: "Pacman y espacio de estados",
        statement: "Si Pacman solo debe llegar de una posición inicial a una final, y no importan comida ni fantasmas, el estado puede representarse con:",
        options: {
          a: "La posición actual de Pacman.",
          b: "Todas las bolas restantes obligatoriamente.",
          c: "La posición final como criterio de meta.",
          d: "El conjunto de operadores N, S, E, O si son movimientos posibles."
        },
        correct: ["a", "c", "d"],
        explanation: "Si el objetivo solo es llegar a una celda, basta con la posición. Las bolas se añaden al estado si el objetivo es comerlas."
      },
      {
        id: "m2q8",
        topic: "Pacman con comida",
        statement: "Si Pacman debe comer todas las bolas, entonces el estado debe incluir:",
        options: {
          a: "La posición de Pacman.",
          b: "Si queda o no comida en cada posición donde inicialmente podía haberla.",
          c: "Solo el número total de pasos dados, siempre.",
          d: "Estados finales donde no queda ninguna bola."
        },
        correct: ["a", "b", "d"],
        explanation: "Para saber si se ha alcanzado la meta hay que saber qué bolas quedan. El número de pasos no caracteriza por sí solo el mundo."
      },
      {
        id: "m2q9",
        topic: "Búsqueda en amplitud",
        statement: "En una búsqueda en amplitud con control de repetidos como en los ejercicios:",
        options: {
          a: "No se generan nodos para estados ya generados antes.",
          b: "Se expande por niveles.",
          c: "La lista abierta funciona como cola.",
          d: "Siempre se usa una heurística para ordenar nodos."
        },
        correct: ["a", "b", "c"],
        explanation: "Amplitud es no informada. El orden viene por profundidad y cola FIFO, no por heurística."
      },
      {
        id: "m2q10",
        topic: "Búsqueda en profundidad",
        statement: "En profundidad, según la convención de ejercicios, para evitar ciclos se puede:",
        options: {
          a: "No generar estados que ya estén en la rama actual.",
          b: "Usar retroceso al llegar a una rama sin salida.",
          c: "Eliminar siempre todos los nodos generados anteriormente del grafo original.",
          d: "Expandir siempre todos los nodos de menor profundidad primero."
        },
        correct: ["a", "b"],
        explanation: "Profundidad trabaja por ramas y puede usar retroceso. No es una búsqueda por niveles."
      },
      {
        id: "m2q11",
        topic: "Complejidad",
        statement: "Sobre la comparación entre amplitud y profundidad con retroceso, marque las correctas:",
        options: {
          a: "Amplitud suele tener alta complejidad espacial porque guarda muchos nodos frontera.",
          b: "Profundidad con retroceso suele tener complejidad espacial proporcional a la rama actual.",
          c: "Amplitud y profundidad siempre expanden exactamente los mismos nodos en el mismo orden.",
          d: "El factor de ramificación influye en el número de nodos generados."
        },
        correct: ["a", "b", "d"],
        explanation: "El factor de ramificación determina cuántos sucesores salen de cada nodo. Las estrategias no expanden necesariamente lo mismo."
      },
      {
        id: "m2q12",
        topic: "Dijkstra",
        statement: "En Dijkstra/coste uniforme, una lista abierta ordenada correctamente prioriza:",
        options: {
          a: "Menor g(n).",
          b: "Menor h(n).",
          c: "Menor coste acumulado desde el origen.",
          d: "La profundidad más baja aunque el coste sea mayor."
        },
        correct: ["a", "c"],
        explanation: "Dijkstra no usa h. Ordena por el coste real acumulado."
      },
      {
        id: "m2q13",
        topic: "A* y sucesores",
        statement: "El orden de generación de sucesores en A* puede afectar:",
        options: {
          a: "A la eficiencia, por desempates y orden de expansión.",
          b: "A la completitud y optimalidad si la heurística y costes cumplen las condiciones habituales.",
          c: "Al número concreto de nodos explorados.",
          d: "A que f(n) deje de ser g(n)+h(n)."
        },
        correct: ["a", "c"],
        explanation: "El orden de sucesores influye en desempates y eficiencia, pero no cambia la fórmula ni debería romper optimalidad/completitud bajo condiciones adecuadas."
      },
      {
        id: "m2q14",
        topic: "Representación en predicados",
        statement: "En un problema de robot que empuja cajas, son predicados razonables:",
        options: {
          a: "robot-en(l).",
          b: "caja-en(c,l).",
          c: "adyacente(l1,l2,o).",
          d: "es-objetivo(l)."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Estos predicados representan posición dinámica del robot/cajas y relaciones estáticas del mapa/objetivos."
      },
      {
        id: "m2q15",
        topic: "Operadores de robot",
        statement: "Para un operador empujar-caja(l1,l2,l3,c,o), son precondiciones razonables:",
        options: {
          a: "robot-en(l1).",
          b: "caja-en(c,l2).",
          c: "adyacente(l1,l2,o) y adyacente(l2,l3,o).",
          d: "Que l3 esté ocupada por otra caja."
        },
        correct: ["a", "b", "c"],
        explanation: "Para empujar, el robot está detrás de la caja y la casilla destino debe estar libre, no ocupada."
      },
      {
        id: "m2q16",
        topic: "Operadores de robot",
        statement: "Tras empujar una caja de l2 a l3 y moverse el robot de l1 a l2, los efectos deben incluir:",
        options: {
          a: "¬robot-en(l1).",
          b: "robot-en(l2).",
          c: "¬caja-en(c,l2).",
          d: "caja-en(c,l3)."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Un operador correcto actualiza tanto la posición del robot como la de la caja, eliminando los hechos antiguos."
      },
      {
        id: "m2q17",
        topic: "8-puzzle",
        statement: "En el 8-puzzle, para representar el movimiento del blanco con predicados, se necesita normalmente:",
        options: {
          a: "Saber dónde está la casilla vacía.",
          b: "Saber qué ficha ocupa la casilla adyacente.",
          c: "Intercambiar el valor de la casilla vacía y la casilla adyacente.",
          d: "Ignorar todas las posiciones del tablero."
        },
        correct: ["a", "b", "c"],
        explanation: "Un movimiento del 8-puzzle cambia dos casillas: la vacía y la ficha movida."
      },
      {
        id: "m2q18",
        topic: "Resolución de conflicto",
        statement: "El orden de las reglas en un sistema de producción:",
        options: {
          a: "Puede afectar a la resolución de conflictos si la estrategia depende del orden.",
          b: "No afecta al proceso de matching/equiparación de condiciones con hechos.",
          c: "Siempre hace que la primera regla sea la única aplicable.",
          d: "Puede cambiar la secuencia de hechos obtenidos cuando hay varias reglas aplicables."
        },
        correct: ["a", "b", "d"],
        explanation: "El matching depende de condiciones y BH. El orden puede intervenir al decidir entre varias reglas aplicables."
      },
      {
        id: "m2q19",
        topic: "Tipos de encadenamiento",
        statement: "Sobre encadenamiento hacia delante y hacia atrás:",
        options: {
          a: "Hacia delante parte de hechos y aplica reglas para derivar nuevos hechos.",
          b: "Hacia atrás parte de una meta y busca reglas que puedan justificarla.",
          c: "Hacia atrás nunca usa reglas.",
          d: "Hacia delante es típico en sistemas dirigidos por datos."
        },
        correct: ["a", "b", "d"],
        explanation: "Adelante es data-driven; atrás es goal-driven. Ambos usan reglas."
      },
      {
        id: "m2q20",
        topic: "Algoritmo RETE",
        statement: "El algoritmo RETE se relaciona con:",
        options: {
          a: "La etapa de equiparación o filtrado en sistemas de producción.",
          b: "La búsqueda eficiente de reglas activables.",
          c: "La defuzzificación por centroide.",
          d: "La política óptima de un MDP."
        },
        correct: ["a", "b"],
        explanation: "RETE es una técnica para hacer eficiente el matching entre reglas y hechos. No pertenece a lógica borrosa ni a MDP."
      }
    ]
  },
  {
    id: "modelo-3",
    title: "Modelo 3 — Incertidumbre, redes bayesianas y Markov",
    subtitle: "Probabilidad, RB, independencia condicional, HMM y cadenas temporales.",
    questions: [
      {
        id: "m3q1",
        topic: "Incertidumbre",
        statement: "En IA, la incertidumbre probabilística se usa especialmente cuando queremos responder a preguntas del tipo:",
        options: {
          a: "¿Qué es más probable?",
          b: "¿Qué distribución tiene una variable desconocida?",
          c: "¿Qué hipótesis es más compatible con una evidencia?",
          d: "¿Qué hecho es verdadero con certeza lógica absoluta siempre?"
        },
        correct: ["a", "b", "c"],
        explanation: "La probabilidad sirve para clasificar, predecir y tomar decisiones bajo incertidumbre. La certeza absoluta pertenece a la lógica clásica."
      },
      {
        id: "m3q2",
        topic: "Probabilidad",
        statement: "Una distribución de probabilidad válida debe cumplir:",
        options: {
          a: "Todas las probabilidades están entre 0 y 1.",
          b: "La suma de probabilidades sobre eventos exhaustivos y excluyentes es 1.",
          c: "Puede tener probabilidades negativas si representan imposibilidad.",
          d: "Probabilidad 1 representa certeza dentro del modelo."
        },
        correct: ["a", "b", "d"],
        explanation: "Las probabilidades negativas no son válidas. 0 es imposible y 1 es cierto dentro del modelo probabilístico."
      },
      {
        id: "m3q3",
        topic: "Probabilidad condicional",
        statement: "Si P(B)>0, ¿cuáles son equivalentes o derivadas correctas?",
        options: {
          a: "P(A|B)=P(A,B)/P(B).",
          b: "P(A,B)=P(A|B)P(B).",
          c: "P(A|B)=P(B|A)P(A)/P(B).",
          d: "P(A|B)=P(B|A) siempre."
        },
        correct: ["a", "b", "c"],
        explanation: "La última solo sería cierta en casos particulares; Bayes necesita multiplicar por P(A) y dividir por P(B)."
      },
      {
        id: "m3q4",
        topic: "Independencia",
        statement: "Dos sucesos A y B son independientes si:",
        options: {
          a: "P(A,B)=P(A)P(B).",
          b: "P(A|B)=P(A), si P(B)>0.",
          c: "P(B|A)=P(B), si P(A)>0.",
          d: "P(A,B)=0 siempre."
        },
        correct: ["a", "b", "c"],
        explanation: "La independencia no significa que no puedan ocurrir juntos, sino que uno no cambia la probabilidad del otro."
      },
      {
        id: "m3q5",
        topic: "Regla de la cadena",
        statement: "La regla de la cadena permite escribir P(X1,...,Xn) como:",
        options: {
          a: "Producto de probabilidades condicionales sucesivas.",
          b: "P(X1)P(X2|X1)P(X3|X1,X2)...",
          c: "Suma de todas las probabilidades a priori.",
          d: "Una forma de calcular conjuntas usando condicionales."
        },
        correct: ["a", "b", "d"],
        explanation: "La regla de la cadena factoriza la conjunta; no es una suma de marginales."
      },
      {
        id: "m3q6",
        topic: "Redes bayesianas",
        statement: "Para construir una red bayesiana se necesita indicar:",
        options: {
          a: "Variables aleatorias y sus dominios.",
          b: "Dependencias directas representadas por arcos.",
          c: "Tablas de probabilidad condicionada o a priori.",
          d: "Una cola FIFO de nodos abiertos."
        },
        correct: ["a", "b", "c"],
        explanation: "La cola FIFO pertenece a búsqueda en amplitud, no a la definición de una red bayesiana."
      },
      {
        id: "m3q7",
        topic: "Independencia condicional",
        statement: "X e Y son independientes condicionalmente dado Z si:",
        options: {
          a: "P(X,Y|Z)=P(X|Z)P(Y|Z).",
          b: "P(X|Y,Z)=P(X|Z).",
          c: "Siempre existe un arco directo entre X e Y.",
          d: "Conocer Y no aporta información adicional sobre X si ya se conoce Z."
        },
        correct: ["a", "b", "d"],
        explanation: "La independencia condicional suele representarse por la ausencia de ciertos arcos, no por tener siempre arco directo."
      },
      {
        id: "m3q8",
        topic: "Factorización RB",
        statement: "Si una red tiene A como padre de B y C, y B y C como padres de D, una factorización correcta es:",
        options: {
          a: "P(A,B,C,D)=P(A)P(B|A)P(C|A)P(D|B,C).",
          b: "P(A,B,C,D)=P(D)P(C|D)P(B|D)P(A|B,C).",
          c: "P(A,B,C,D)=P(A)P(B)P(C)P(D) siempre.",
          d: "La factorización se obtiene multiplicando cada variable condicionada por sus padres."
        },
        correct: ["a", "d"],
        explanation: "En una RB cada nodo se condiciona solo a sus padres. No se asume independencia total salvo que la estructura lo indique."
      },
      {
        id: "m3q9",
        topic: "Inferencia RB",
        statement: "Si se pide P(Consulta | Evidencia) en una red bayesiana, las variables no observadas que no son consulta ni evidencia:",
        options: {
          a: "Se tratan como variables ocultas.",
          b: "Se pueden eliminar sumando sobre sus valores.",
          c: "Se ignoran sin más, aunque afecten a la probabilidad.",
          d: "Pueden formar parte del cálculo de normalización."
        },
        correct: ["a", "b", "d"],
        explanation: "Las ocultas no se ignoran: se marginalizan sumando. Después se normaliza para que la distribución sume 1."
      },
      {
        id: "m3q10",
        topic: "Naive Bayes",
        statement: "En un clasificador Naive Bayes, normalmente se asume que:",
        options: {
          a: "Los atributos son condicionalmente independientes dada la clase.",
          b: "La clase actúa como padre común de los atributos.",
          c: "Nunca se usa el teorema de Bayes.",
          d: "Se calcula la clase más probable dada la evidencia observada."
        },
        correct: ["a", "b", "d"],
        explanation: "Naive Bayes usa Bayes y una suposición fuerte: independencia condicional de atributos dada la clase."
      },
      {
        id: "m3q11",
        topic: "Redes bayesianas",
        statement: "En una estructura divergente A → B y A → C, marque las correctas:",
        options: {
          a: "B y C pueden ser dependientes si no se conoce A.",
          b: "B y C son independientes condicionados a A.",
          c: "A actúa como causa común o variable explicativa.",
          d: "B y C son siempre independientes aunque A sea desconocida."
        },
        correct: ["a", "b", "c"],
        explanation: "En la divergente, observar la causa común bloquea la dependencia entre los efectos."
      },
      {
        id: "m3q12",
        topic: "Redes bayesianas",
        statement: "En una estructura convergente A → C ← B, marque las correctas:",
        options: {
          a: "A y B pueden ser independientes a priori.",
          b: "Observar C puede hacer dependientes a A y B.",
          c: "C es un efecto común.",
          d: "A y B siempre deben tener arco directo entre sí."
        },
        correct: ["a", "b", "c"],
        explanation: "El collider o estructura convergente se abre al observar el efecto o descendientes del efecto."
      },
      {
        id: "m3q13",
        topic: "Cadenas de Markov",
        statement: "Una cadena de Markov de primer orden estacionaria se define mediante:",
        options: {
          a: "P(X0).",
          b: "P(Xt | Xt-1).",
          c: "Una transición que se mantiene igual para todos los pasos temporales.",
          d: "P(Xt | X0,...,Xt-2) obligatoriamente completa."
        },
        correct: ["a", "b", "c"],
        explanation: "Primer orden significa que basta el estado anterior; estacionaria significa que la tabla de transición no cambia con t."
      },
      {
        id: "m3q14",
        topic: "Propiedad de Markov",
        statement: "La propiedad de Markov afirma que:",
        options: {
          a: "El futuro es independiente del pasado dado el presente.",
          b: "P(Xt+1|Xt,...,X0)=P(Xt+1|Xt).",
          c: "La secuencia no puede tener incertidumbre.",
          d: "El estado actual resume la información relevante para predecir el siguiente."
        },
        correct: ["a", "b", "d"],
        explanation: "La cadena sigue siendo probabilística; la propiedad solo simplifica las dependencias temporales."
      },
      {
        id: "m3q15",
        topic: "HMM",
        statement: "Un Modelo Oculto de Markov añade a una cadena de Markov:",
        options: {
          a: "Estados ocultos o latentes.",
          b: "Variables de evidencia/observación.",
          c: "Probabilidades de emisión P(Ei|Xi).",
          d: "Acciones y recompensas obligatoriamente."
        },
        correct: ["a", "b", "c"],
        explanation: "Acciones y recompensas son propias de MDP. HMM trata observaciones generadas por estados ocultos."
      },
      {
        id: "m3q16",
        topic: "HMM aplicado",
        statement: "Para modelar si un alumno entiende una asignatura mediante un HMM, son componentes razonables:",
        options: {
          a: "Estado oculto: nivel de comprensión.",
          b: "Evidencia: resultado de exámenes o prácticas.",
          c: "Transición: cómo cambia el nivel de comprensión entre momentos.",
          d: "Emisión: probabilidad de observar cierto resultado dado el nivel."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Es el patrón típico de HMM: estado latente temporal más observaciones dependientes del estado."
      },
      {
        id: "m3q17",
        topic: "HMM vs MDP",
        statement: "La diferencia clave entre HMM y MDP es:",
        options: {
          a: "HMM modela estados ocultos y observaciones.",
          b: "MDP incorpora acciones y recompensa/coste para decidir.",
          c: "HMM se usa para inferir estados; MDP para elegir acciones.",
          d: "MDP no tiene estados."
        },
        correct: ["a", "b", "c"],
        explanation: "MDP sí tiene estados. La diferencia está en decisión/acciones frente a observación de estados ocultos."
      },
      {
        id: "m3q18",
        topic: "POMDP",
        statement: "Un POMDP se caracteriza por:",
        options: {
          a: "Combinar decisión secuencial con observación parcial.",
          b: "Incluir acciones como en MDP.",
          c: "Manejar incertidumbre sobre el estado real.",
          d: "Ser igual que una búsqueda en amplitud sin costes."
        },
        correct: ["a", "b", "c"],
        explanation: "POMDP es más complejo que MDP porque el agente no observa completamente el estado."
      },
      {
        id: "m3q19",
        topic: "Aplicaciones probabilísticas",
        statement: "Son aplicaciones típicas del razonamiento probabilístico en IA:",
        options: {
          a: "Clasificación.",
          b: "Predicción de secuencias.",
          c: "Toma de decisiones bajo incertidumbre.",
          d: "Sustituir siempre toda lógica clásica por probabilidad."
        },
        correct: ["a", "b", "c"],
        explanation: "No siempre se sustituye la lógica clásica; depende del tipo de incertidumbre y tarea."
      },
      {
        id: "m3q20",
        topic: "Probabilidad vs borrosa",
        statement: "La diferencia correcta entre probabilidad y lógica borrosa es:",
        options: {
          a: "La probabilidad mide incertidumbre sobre eventos.",
          b: "La lógica borrosa mide grados de pertenencia o verdad en conceptos vagos.",
          c: "Decir μAlta(temperatura)=0.8 no significa necesariamente 80% de probabilidad.",
          d: "Ambas son idénticas porque usan números entre 0 y 1."
        },
        correct: ["a", "b", "c"],
        explanation: "Usar [0,1] no las hace equivalentes. Una habla de incertidumbre; la otra de vaguedad."
      }
    ]
  },
  {
    id: "modelo-4",
    title: "Modelo 4 — Heurística, MDP, borrosa y robótica",
    subtitle: "Preguntas con trampas frecuentes de final ordinario.",
    questions: [
      {
        id: "m4q1",
        topic: "Heurística",
        statement: "Una función heurística h(n) representa:",
        options: {
          a: "Conocimiento parcial del dominio.",
          b: "Una estimación del coste o distancia hasta la meta.",
          c: "Siempre el coste real exacto.",
          d: "Una ayuda para ordenar la búsqueda informada."
        },
        correct: ["a", "b", "d"],
        explanation: "La heurística suele ser una estimación útil, no necesariamente exacta."
      },
      {
        id: "m4q2",
        topic: "Problemas relajados",
        statement: "Las heurísticas del 8-puzzle como casillas mal colocadas o Manhattan pueden obtenerse a partir de:",
        options: {
          a: "Problemas relajados.",
          b: "Eliminar algunas restricciones del problema original.",
          c: "Inventar un valor aleatorio para cada estado.",
          d: "Resolver un problema más sencillo que da una cota inferior."
        },
        correct: ["a", "b", "d"],
        explanation: "Las relajaciones simplifican el problema y suelen producir heurísticas admisibles."
      },
      {
        id: "m4q3",
        topic: "Manhattan",
        statement: "La distancia Manhattan es apropiada cuando:",
        options: {
          a: "El movimiento está restringido a horizontal/vertical en una cuadrícula.",
          b: "Se calcula sumando diferencias absolutas de coordenadas.",
          c: "Siempre sobreestima cualquier distancia real.",
          d: "Puede ser admisible en problemas como el 8-puzzle."
        },
        correct: ["a", "b", "d"],
        explanation: "Manhattan no sobreestima si los movimientos permitidos son ortogonales y no hay atajos diagonales."
      },
      {
        id: "m4q4",
        topic: "Escalada",
        statement: "En búsqueda por escalada, marque las correctas:",
        options: {
          a: "Se elige el sucesor que mejora la evaluación local.",
          b: "Puede detenerse en una meseta o máximo/mínimo local.",
          c: "Puede devolver una solución subóptima.",
          d: "Siempre revisa todos los caminos posibles antes de decidir."
        },
        correct: ["a", "b", "c"],
        explanation: "Escalada toma decisiones locales; no explora exhaustivamente el espacio."
      },
      {
        id: "m4q5",
        topic: "A*",
        statement: "Si h es admisible, A* normalmente garantiza optimalidad porque:",
        options: {
          a: "h no sobreestima el coste real hasta la meta.",
          b: "f(n)=g(n)+h(n) combina coste real y estimación.",
          c: "Siempre expande primero el nodo alfabéticamente menor.",
          d: "No descarta caminos baratos por una estimación demasiado optimista hacia arriba."
        },
        correct: ["a", "b", "d"],
        explanation: "El orden alfabético puede ser desempate, pero no la razón de optimalidad."
      },
      {
        id: "m4q6",
        topic: "A* ponderado",
        statement: "Si se usa una heurística con peso w>1 en A*, marque las afirmaciones prudentes:",
        options: {
          a: "Puede mejorar eficiencia en algunos casos.",
          b: "Puede perder la garantía de optimalidad si la heurística queda efectivamente sobreponderada.",
          c: "Siempre mantiene exactamente las mismas propiedades que A* clásico.",
          d: "Puede favorecer más la estimación h que el coste real g."
        },
        correct: ["a", "b", "d"],
        explanation: "Ponderar h puede hacer el algoritmo más voraz. Esto puede ahorrar nodos, pero arriesga optimalidad."
      },
      {
        id: "m4q7",
        topic: "MDP",
        statement: "En un MDP, una política π es:",
        options: {
          a: "Un mapeo de estados a acciones.",
          b: "La tabla de probabilidades a priori de un HMM.",
          c: "Una regla que indica qué hacer en cada estado.",
          d: "Un elemento necesario para decidir en entornos estocásticos."
        },
        correct: ["a", "c", "d"],
        explanation: "La política decide acciones. No es la distribución inicial de un HMM."
      },
      {
        id: "m4q8",
        topic: "Bellman",
        statement: "Las ecuaciones de Bellman en MDP con costes representan:",
        options: {
          a: "El coste esperado de llegar a la meta desde cada estado.",
          b: "Una actualización recursiva de valores.",
          c: "Una forma de comparar acciones por coste esperado.",
          d: "La probabilidad de emisión de una observación."
        },
        correct: ["a", "b", "c"],
        explanation: "La emisión es de HMM. Bellman calcula valores y permite obtener la política óptima."
      },
      {
        id: "m4q9",
        topic: "MDP",
        statement: "Si C es estado meta absorbente y trabajamos con costes, normalmente:",
        options: {
          a: "V(C)=0.",
          b: "No se define una acción necesaria para seguir avanzando desde C.",
          c: "C siempre tiene coste infinito.",
          d: "Llegar a C termina el problema."
        },
        correct: ["a", "b", "d"],
        explanation: "El estado meta no necesita más coste; por eso se suele fijar valor 0."
      },
      {
        id: "m4q10",
        topic: "MDP vs búsqueda",
        statement: "Frente a búsqueda clásica determinista, un MDP se usa cuando:",
        options: {
          a: "Las acciones pueden tener resultados probabilísticos.",
          b: "Queremos elegir acciones considerando coste/recompensa esperada.",
          c: "No existen estados.",
          d: "Una misma acción en un estado puede llevar a varios estados con distintas probabilidades."
        },
        correct: ["a", "b", "d"],
        explanation: "Los MDP siguen teniendo estados, pero las transiciones son probabilísticas y se optimiza el valor esperado."
      },
      {
        id: "m4q11",
        topic: "Lógica borrosa",
        statement: "Una función de pertenencia μF(x):",
        options: {
          a: "Devuelve un valor entre 0 y 1.",
          b: "Indica el grado en que x pertenece al conjunto borroso F.",
          c: "Es siempre una probabilidad de ocurrencia.",
          d: "Puede tomar valores intermedios como 0.3 o 0.8."
        },
        correct: ["a", "b", "d"],
        explanation: "La pertenencia no es lo mismo que probabilidad. Un valor intermedio representa grado de pertenencia."
      },
      {
        id: "m4q12",
        topic: "Conectivas borrosas",
        statement: "En inferencia borrosa max-min, se suele usar:",
        options: {
          a: "AND como mínimo.",
          b: "OR como máximo.",
          c: "NOT como complemento 1-μ.",
          d: "XOR como único operador obligatorio."
        },
        correct: ["a", "b", "c"],
        explanation: "Max-min usa mínimo y máximo. El complemento habitual es 1 menos el grado."
      },
      {
        id: "m4q13",
        topic: "Mamdani",
        statement: "En un sistema borroso tipo Mamdani aparecen estas fases:",
        options: {
          a: "Borrosificación.",
          b: "Evaluación/inferencia de reglas.",
          c: "Agregación de salidas.",
          d: "Deborrosificación."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Son las fases completas para pasar de entradas nítidas a una salida nítida."
      },
      {
        id: "m4q14",
        topic: "Control borroso",
        statement: "Si una regla dice 'SI humedad es seca AND luz es soleada ENTONCES riego alto', su grado de activación con max-min se obtiene mediante:",
        options: {
          a: "El mínimo de los grados de humedad seca y luz soleada.",
          b: "El máximo de los grados de humedad seca y luz soleada.",
          c: "El producto siempre, sin alternativa.",
          d: "El valor de verdad del antecedente borroso."
        },
        correct: ["a", "d"],
        explanation: "Para AND en max-min se toma el mínimo. Ese valor recorta o escala la salida de la regla."
      },
      {
        id: "m4q15",
        topic: "Robótica",
        statement: "En un robot, los sensores y actuadores cumplen que:",
        options: {
          a: "Los sensores captan información del entorno o del propio robot.",
          b: "Los actuadores ejecutan acciones físicas como movimiento.",
          c: "Los sensores son motores.",
          d: "Los actuadores pueden ser controlados por la unidad de control."
        },
        correct: ["a", "b", "d"],
        explanation: "Sensores perciben; actuadores actúan. No hay que confundir entrada con salida."
      },
      {
        id: "m4q16",
        topic: "Arquitectura robótica",
        statement: "Una arquitectura reactiva se caracteriza por:",
        options: {
          a: "Responder rápido a estímulos del entorno.",
          b: "No depender necesariamente de planificación global compleja.",
          c: "Ser útil para comportamientos inmediatos.",
          d: "Garantizar siempre ruta óptima global."
        },
        correct: ["a", "b", "c"],
        explanation: "Lo reactivo prioriza respuesta rápida. Para ruta óptima global suelen hacer falta representación del mapa y planificación."
      },
      {
        id: "m4q17",
        topic: "Planificación robótica",
        statement: "Para que un robot encuentre una ruta óptima entre dos puntos suele ser necesario:",
        options: {
          a: "Representar el mapa o espacio navegable.",
          b: "Definir estado inicial y meta.",
          c: "Usar un algoritmo de planificación como A* si hay costes/heurística.",
          d: "Usar solo dos controladores reactivos sin mapa en todos los casos."
        },
        correct: ["a", "b", "c"],
        explanation: "La arquitectura reactiva puede moverse, pero optimalidad requiere planificación sobre una representación."
      },
      {
        id: "m4q18",
        topic: "Controladores",
        statement: "Entre técnicas para construir controladores de robots aparecen:",
        options: {
          a: "Sistemas de producción o reglas.",
          b: "Sistemas borrosos.",
          c: "Sistemas erráticos como técnica formal principal.",
          d: "Controladores neuronales o aprendidos en ciertos casos."
        },
        correct: ["a", "b", "d"],
        explanation: "Reglas, borrosa y aprendizaje pueden usarse en control. 'Errático' no es una técnica formal del temario."
      },
      {
        id: "m4q19",
        topic: "Técnicas IA",
        statement: "Para detectar por vídeo si un conductor está concentrado, distraído o dormido, una técnica adecuada sería:",
        options: {
          a: "Redes neuronales.",
          b: "Aprendizaje automático supervisado con ejemplos etiquetados.",
          c: "Visión artificial combinada con clasificación.",
          d: "Un MDP necesariamente, porque siempre hay acciones y recompensas."
        },
        correct: ["a", "b", "c"],
        explanation: "El problema descrito es de percepción/clasificación. MDP sería para elegir acciones secuenciales, no simplemente clasificar vídeo."
      },
      {
        id: "m4q20",
        topic: "Comparación de técnicas",
        statement: "Relacione correctamente técnicas y uso típico:",
        options: {
          a: "A*: planificación de caminos con costes y heurística.",
          b: "Lógica borrosa: control con conceptos vagos.",
          c: "HMM: inferir estados ocultos a partir de observaciones temporales.",
          d: "MDP: elegir acciones bajo transición probabilística."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Las cuatro relaciones son correctas y resumen los bloques centrales del final."
      }
    ]
  },
  {
    id: "modelo-5",
    title: "Modelo 5 — Aprendizaje automático y bioinspiradas",
    subtitle: "Incluye repaso general para no perder puntos de teoría final.",
    questions: [
      {
        id: "m5q1",
        topic: "Aprendizaje automático",
        statement: "Según la definición de aprendizaje automático vista en clase, un programa aprende si:",
        options: {
          a: "Mejora automáticamente con la experiencia.",
          b: "La mejora se mide respecto a alguna medida de rendimiento.",
          c: "Nunca necesita datos.",
          d: "Puede aprender conocimiento nuevo o mejorar comportamiento."
        },
        correct: ["a", "b", "d"],
        explanation: "ML se basa en experiencia/datos y medida de rendimiento. No significa funcionar sin datos."
      },
      {
        id: "m5q2",
        topic: "Motivación ML",
        statement: "Entre las motivaciones de las técnicas de aprendizaje automático están:",
        options: {
          a: "La explosión de datos en la sociedad de la información.",
          b: "La personalización y adaptación al individuo.",
          c: "La comprensibilidad de la salida.",
          d: "Que el desarrollo manual de software puede ser un cuello de botella."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Todas aparecen como motivaciones: datos, personalización, comprensión y dificultad de programar manualmente todas las reglas."
      },
      {
        id: "m5q3",
        topic: "Tipos de aprendizaje",
        statement: "El aprendizaje supervisado se caracteriza por:",
        options: {
          a: "Usar ejemplos etiquetados.",
          b: "Aprender una función que relacione entradas con salidas/clases.",
          c: "No usar nunca clases o etiquetas.",
          d: "Ser útil en clasificación."
        },
        correct: ["a", "b", "d"],
        explanation: "Supervisado implica etiquetas. Sin etiquetas hablamos típicamente de no supervisado."
      },
      {
        id: "m5q4",
        topic: "Aprendizaje no supervisado",
        statement: "El aprendizaje no supervisado:",
        options: {
          a: "Busca patrones sin clases etiquetadas.",
          b: "Puede incluir clustering.",
          c: "Agrupa datos por similitud.",
          d: "Siempre necesita una etiqueta correcta por instancia."
        },
        correct: ["a", "b", "c"],
        explanation: "Clustering es el ejemplo típico de no supervisado; no hay etiqueta objetivo."
      },
      {
        id: "m5q5",
        topic: "Conceptos ML",
        statement: "En aprendizaje automático, marque las correctas:",
        options: {
          a: "Un atributo es una característica de una instancia.",
          b: "Una instancia es un ejemplo o caso del conjunto de datos.",
          c: "Una clase puede ser la etiqueta que se quiere predecir.",
          d: "Un atributo y una clase significan siempre exactamente lo mismo."
        },
        correct: ["a", "b", "c"],
        explanation: "Atributos describen; clase suele ser el valor objetivo en clasificación."
      },
      {
        id: "m5q6",
        topic: "Naive Bayes",
        statement: "Sobre Naive Bayes en aprendizaje automático, marque las correctas:",
        options: {
          a: "Utiliza el teorema de Bayes.",
          b: "Simplifica el cálculo suponiendo independencia condicional de atributos dada la clase.",
          c: "Puede usarse para clasificación.",
          d: "No usa probabilidades."
        },
        correct: ["a", "b", "c"],
        explanation: "Es un clasificador probabilístico; por tanto, sí usa probabilidades."
      },
      {
        id: "m5q7",
        topic: "Evaluación ML",
        statement: "Para evaluar un modelo de ML correctamente:",
        options: {
          a: "Los ejemplos de entrenamiento y test deben ser diferentes.",
          b: "Puede usarse holdout/split.",
          c: "Puede usarse validación cruzada k-fold.",
          d: "Lo correcto es probar siempre con los mismos datos usados para entrenar."
        },
        correct: ["a", "b", "c"],
        explanation: "Probar con los datos de entrenamiento infla el rendimiento y no mide generalización."
      },
      {
        id: "m5q8",
        topic: "K-fold",
        statement: "En validación cruzada k-fold:",
        options: {
          a: "Se divide el conjunto de ejemplos en k partes.",
          b: "Se entrena k veces usando k-1 partes y probando con la parte restante.",
          c: "La tasa de error se estima promediando errores.",
          d: "Solo se puede usar si k=1."
        },
        correct: ["a", "b", "c"],
        explanation: "K-fold repite el entrenamiento/prueba con distintas particiones. K=1 no es el caso general."
      },
      {
        id: "m5q9",
        topic: "Redes neuronales",
        statement: "Una red neuronal artificial se caracteriza por:",
        options: {
          a: "Unidades llamadas neuronas o nodos.",
          b: "Conexiones con pesos.",
          c: "Aprendizaje mediante ajuste de pesos.",
          d: "No poder combinar varias capas."
        },
        correct: ["a", "b", "c"],
        explanation: "Las redes multicapa son precisamente una extensión importante."
      },
      {
        id: "m5q10",
        topic: "Neurona artificial",
        statement: "En una neurona artificial típica:",
        options: {
          a: "Se calcula una suma ponderada de entradas.",
          b: "Puede haber un umbral o sesgo.",
          c: "Se aplica una función de activación.",
          d: "Los pesos nunca influyen en la salida."
        },
        correct: ["a", "b", "c"],
        explanation: "Los pesos determinan la importancia de las señales de entrada."
      },
      {
        id: "m5q11",
        topic: "Perceptrón multicapa",
        statement: "Sobre el perceptrón multicapa, marque las correctas:",
        options: {
          a: "Tiene al menos una capa oculta entre entrada y salida.",
          b: "Puede resolver problemas no lineales complejos.",
          c: "Utiliza ajuste de pesos según el error.",
          d: "Solo puede clasificar datos linealmente separables."
        },
        correct: ["a", "b", "c"],
        explanation: "El MLP supera la limitación del perceptrón simple gracias a capas ocultas y funciones no lineales."
      },
      {
        id: "m5q12",
        topic: "Overfitting",
        statement: "Pueden contribuir al sobreaprendizaje en redes neuronales:",
        options: {
          a: "Demasiadas neuronas o demasiada capacidad para pocos datos.",
          b: "Conjunto de entrenamiento muy pequeño.",
          c: "No aplicar regularización cuando hace falta.",
          d: "Tener exactamente un modelo que generaliza perfectamente."
        },
        correct: ["a", "b", "c"],
        explanation: "Overfitting es aprender demasiado los detalles del entrenamiento y generalizar mal."
      },
      {
        id: "m5q13",
        topic: "Algoritmos genéticos",
        statement: "En un algoritmo genético aparecen normalmente:",
        options: {
          a: "Población de individuos.",
          b: "Función de adecuación o fitness.",
          c: "Selección de individuos.",
          d: "Operadores de cruce y mutación."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Son los componentes básicos: población, evaluación, selección y generación de nuevos individuos."
      },
      {
        id: "m5q14",
        topic: "Fitness",
        statement: "La función de fitness mide:",
        options: {
          a: "La calidad o adecuación de un individuo como solución.",
          b: "La capacidad de un individuo para resolver el problema.",
          c: "Un criterio para favorecer la selección.",
          d: "El número fijo de capas ocultas de una red neuronal."
        },
        correct: ["a", "b", "c"],
        explanation: "Fitness pertenece a algoritmos genéticos, no define capas de redes."
      },
      {
        id: "m5q15",
        topic: "Cruce y mutación",
        statement: "En algoritmos genéticos:",
        options: {
          a: "El cruce combina información de individuos padres.",
          b: "La mutación introduce cambios aleatorios.",
          c: "La mutación ayuda a mantener diversidad.",
          d: "La selección siempre elige únicamente al peor individuo."
        },
        correct: ["a", "b", "c"],
        explanation: "La selección tiende a favorecer individuos buenos, aunque puede incluir aleatoriedad."
      },
      {
        id: "m5q16",
        topic: "Bioinspiradas",
        statement: "Redes neuronales y algoritmos genéticos se parecen en que:",
        options: {
          a: "Se inspiran en procesos biológicos.",
          b: "Ambos pueden mejorar su rendimiento ajustando parámetros o soluciones.",
          c: "Ambos son necesariamente aprendizaje supervisado.",
          d: "Ambos pueden utilizarse para resolver problemas complejos."
        },
        correct: ["a", "b", "d"],
        explanation: "Los genéticos no son necesariamente aprendizaje supervisado."
      },
      {
        id: "m5q17",
        topic: "Minería de datos",
        statement: "La minería de datos puede descubrir patrones:",
        options: {
          a: "Predictivos.",
          b: "Descriptivos.",
          c: "Únicamente binarios verdadero/falso.",
          d: "Útiles para clasificación o agrupamiento."
        },
        correct: ["a", "b", "d"],
        explanation: "Predictivo/descriptivo es la distinción importante. Clasificación y clustering son ejemplos de tareas."
      },
      {
        id: "m5q18",
        topic: "Robótica",
        statement: "Un robot puede describirse como:",
        options: {
          a: "Una máquina o dispositivo programable que realiza tareas.",
          b: "Un sistema con sensores, control y actuadores.",
          c: "Algo que necesariamente solo realiza tareas domésticas.",
          d: "Un agente que puede operar con cierto grado de autonomía."
        },
        correct: ["a", "b", "d"],
        explanation: "La robótica incluye industria, medicina, transporte, exploración, entretenimiento, etc."
      },
      {
        id: "m5q19",
        topic: "Autonomía robótica",
        statement: "La autonomía en robótica implica:",
        options: {
          a: "Operar sin intervención humana continua.",
          b: "Tomar decisiones o ejecutar comportamientos según percepción/control.",
          c: "No necesitar sensores nunca.",
          d: "Puede variar por niveles según la tarea."
        },
        correct: ["a", "b", "d"],
        explanation: "La autonomía requiere percepción y control; no elimina la necesidad de sensores."
      },
      {
        id: "m5q20",
        topic: "Repaso transversal",
        statement: "Marque asociaciones correctas:",
        options: {
          a: "Clustering → aprendizaje no supervisado.",
          b: "Árboles de decisión → reglas tipo si-entonces.",
          c: "Naive Bayes → clasificación probabilística.",
          d: "Algoritmos genéticos → selección, cruce y mutación."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Las cuatro son asociaciones típicas de examen."
      }
    ]
  },
  {
    id: "modelo-6",
    title: "Modelo 6 — Final mixto con trampas",
    subtitle: "Simulacro final mezclado, con varias correctas por pregunta.",
    questions: [
      {
        id: "m6q1",
        topic: "Test de Turing e IA",
        statement: "El Test de Turing se entiende como:",
        options: {
          a: "Una prueba de comportamiento inteligente similar o indistinguible del humano.",
          b: "Una prueba que implica interacción mediante lenguaje natural.",
          c: "Una medición directa del coeficiente intelectual de una máquina.",
          d: "Una prueba histórica asociada a la pregunta de si las máquinas pueden pensar."
        },
        correct: ["a", "b", "d"],
        explanation: "No mide CI. Evalúa si el comportamiento conversacional puede pasar por humano."
      },
      {
        id: "m6q2",
        topic: "Dartmouth e historia IA",
        statement: "El taller de Dartmouth se asocia con:",
        options: {
          a: "El nacimiento formal de la IA como disciplina de investigación.",
          b: "John McCarthy.",
          c: "La idea de que aspectos de la inteligencia podrían describirse para ser simulados por máquinas.",
          d: "La invención de la defuzzificación por centroide."
        },
        correct: ["a", "b", "c"],
        explanation: "Dartmouth pertenece a la historia fundacional de IA, no a lógica borrosa."
      },
      {
        id: "m6q3",
        topic: "Sistemas de producción",
        statement: "En la parte derecha de una regla de producción pueden aparecer:",
        options: {
          a: "Hechos a añadir a la BH.",
          b: "Hechos a retirar de la BH.",
          c: "Acciones sobre el mundo externo.",
          d: "Una referencia obligatoria a otra regla por nombre."
        },
        correct: ["a", "b", "c"],
        explanation: "Las reglas se encadenan mediante hechos, no llamando explícitamente a otra regla por nombre."
      },
      {
        id: "m6q4",
        topic: "Razonamiento monótono",
        statement: "Un sistema de producción con reglas que solo añaden hechos:",
        options: {
          a: "Puede considerarse monótono.",
          b: "Nunca elimina conocimiento de la BH.",
          c: "Puede seguir generando nuevos hechos si hay reglas aplicables.",
          d: "Siempre debe ser no monótono."
        },
        correct: ["a", "b", "c"],
        explanation: "Monótono implica que no se retractan hechos; la información acumulada no disminuye."
      },
      {
        id: "m6q5",
        topic: "Búsqueda",
        statement: "Cuando decimos que un algoritmo de búsqueda es completo, significa que:",
        options: {
          a: "Si existe solución, la encuentra bajo las condiciones del algoritmo.",
          b: "Siempre devuelve la solución óptima.",
          c: "Nunca necesita memoria.",
          d: "Es una propiedad distinta de la optimalidad."
        },
        correct: ["a", "d"],
        explanation: "Completo no significa óptimo. Completo = encuentra solución si existe; óptimo = encuentra la mejor."
      },
      {
        id: "m6q6",
        topic: "Comparación de búsqueda",
        statement: "Entre las medidas para comparar algoritmos de búsqueda están:",
        options: {
          a: "Complejidad temporal.",
          b: "Complejidad espacial.",
          c: "Optimalidad.",
          d: "Completitud."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Todas son criterios clásicos: tiempo, memoria, si encuentra solución y si es la mejor."
      },
      {
        id: "m6q7",
        topic: "Heurística no informada",
        statement: "Si una heurística aporta muy poca información, entonces:",
        options: {
          a: "A* puede seguir encontrando solución bajo condiciones adecuadas.",
          b: "Puede ser menos eficiente que con una heurística más informada.",
          c: "Siempre hace imposible encontrar solución.",
          d: "Puede comportarse parecido a búsqueda de coste uniforme si h es cero."
        },
        correct: ["a", "b", "d"],
        explanation: "Una heurística nula no impide resolver; simplemente no guía. A* con h=0 se parece a coste uniforme."
      },
      {
        id: "m6q8",
        topic: "Heurística que sobreestima",
        statement: "Si una heurística sobreestima el coste real:",
        options: {
          a: "Puede dejar de ser admisible.",
          b: "A* puede perder garantía de optimalidad.",
          c: "A* necesariamente no encuentra ninguna solución jamás.",
          d: "Puede conducir a soluciones subóptimas."
        },
        correct: ["a", "b", "d"],
        explanation: "Sobreestimar no impide siempre encontrar solución, pero puede romper optimalidad."
      },
      {
        id: "m6q9",
        topic: "Dijkstra y A*",
        statement: "Dijkstra puede verse como un caso especial de A* cuando:",
        options: {
          a: "h(n)=0 para todos los nodos.",
          b: "f(n)=g(n).",
          c: "No se usa información heurística.",
          d: "h(n) sobreestima siempre."
        },
        correct: ["a", "b", "c"],
        explanation: "Con h=0, A* ordena por g(n), igual que coste uniforme/Dijkstra."
      },
      {
        id: "m6q10",
        topic: "Probabilidad y lógica clásica",
        statement: "Marque las correctas:",
        options: {
          a: "En lógica clásica una aserción suele tratarse como verdadera o falsa.",
          b: "En probabilidad se pueden representar grados de creencia.",
          c: "La probabilidad de un evento puede interpretarse como frecuencia o creencia según el contexto.",
          d: "El cálculo probabilístico depende de la interpretación concreta y cambia sus reglas algebraicas."
        },
        correct: ["a", "b", "c"],
        explanation: "La interpretación puede variar, pero el cálculo formal de probabilidades sigue las mismas reglas."
      },
      {
        id: "m6q11",
        topic: "Red bayesiana",
        statement: "Las redes bayesianas permiten:",
        options: {
          a: "Representar de forma compacta distribuciones conjuntas usando independencias condicionales.",
          b: "Realizar consultas de probabilidad dada evidencia.",
          c: "Reducir el número de parámetros respecto a una tabla conjunta completa en muchos dominios.",
          d: "Evitar por completo la necesidad de probabilidades."
        },
        correct: ["a", "b", "c"],
        explanation: "Las redes bayesianas son probabilísticas; no eliminan probabilidades, las organizan."
      },
      {
        id: "m6q12",
        topic: "TPC",
        statement: "Una tabla de probabilidad condicionada de un nodo X con padres Pa(X):",
        options: {
          a: "Especifica P(X | Pa(X)).",
          b: "Debe sumar 1 para cada combinación de valores de los padres.",
          c: "Si X no tiene padres, se convierte en una probabilidad a priori P(X).",
          d: "Representa siempre P(Pa(X)|X)."
        },
        correct: ["a", "b", "c"],
        explanation: "La TPC es de la variable dado sus padres, no al revés."
      },
      {
        id: "m6q13",
        topic: "HMM",
        statement: "Los inputs necesarios para representar un HMM incluyen:",
        options: {
          a: "Estados ocultos.",
          b: "Observaciones.",
          c: "Probabilidad inicial y de transición.",
          d: "Modelo de observación o emisión."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Un HMM completo necesita estado oculto, evidencia observable, P(X0), P(Xt|Xt-1) y P(Et|Xt)."
      },
      {
        id: "m6q14",
        topic: "MDP",
        statement: "Si en un MDP una acción en A lleva a B con probabilidad 0.8 y permanece en A con 0.2, entonces:",
        options: {
          a: "La transición es estocástica.",
          b: "La suma de probabilidades de resultados de esa acción debe ser 1.",
          c: "La acción tiene resultado determinista único.",
          d: "Bellman puede usar esas probabilidades para calcular coste esperado."
        },
        correct: ["a", "b", "d"],
        explanation: "Hay dos resultados posibles con probabilidades. Eso es transición probabilística."
      },
      {
        id: "m6q15",
        topic: "Lógica borrosa",
        statement: "En lógica borrosa, decir que la concentración alta tiene grado 0.9 significa:",
        options: {
          a: "Que pertenece al concepto 'alta' con grado 0.9.",
          b: "Que necesariamente hay 90% de probabilidad de morir.",
          c: "Que no es una verdad binaria absoluta.",
          d: "Que se está usando una función de pertenencia."
        },
        correct: ["a", "c", "d"],
        explanation: "Grado de pertenencia no equivale directamente a probabilidad de un evento."
      },
      {
        id: "m6q16",
        topic: "Deborrosificación",
        statement: "La deborrosificación sirve para:",
        options: {
          a: "Transformar una salida borrosa agregada en un valor numérico nítido.",
          b: "Obtener una acción concreta en controladores.",
          c: "Calcular una salida final, por ejemplo mediante centroide.",
          d: "Convertir una regla SI-ENTONCES en una probabilidad a priori."
        },
        correct: ["a", "b", "c"],
        explanation: "El centroide es un método típico para obtener un valor final. No tiene que ver con probabilidades a priori."
      },
      {
        id: "m6q17",
        topic: "ML",
        statement: "Marque las correctas sobre aprendizaje semi-supervisado:",
        options: {
          a: "Puede usar datos etiquetados y no etiquetados.",
          b: "Está relacionado con aprendizaje cuando no todas las instancias tienen etiqueta.",
          c: "Es idéntico a no supervisado puro.",
          d: "Puede aparecer como respuesta junto a supervisado si se pregunta por datos etiquetados."
        },
        correct: ["a", "b", "d"],
        explanation: "Semi-supervisado combina una parte etiquetada con otra sin etiquetar."
      },
      {
        id: "m6q18",
        topic: "Algoritmos genéticos",
        statement: "En un algoritmo genético con codificación binaria:",
        options: {
          a: "Cada individuo puede representarse como una cadena de bits.",
          b: "La selección favorece individuos con mejor fitness.",
          c: "El cruce combina partes de individuos.",
          d: "La mutación introduce variaciones aleatorias."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Es el esquema clásico: codificación, fitness, selección, cruce y mutación."
      },
      {
        id: "m6q19",
        topic: "Robótica",
        statement: "Para controlar un dron desde sensores hasta motores, un flujo razonable es:",
        options: {
          a: "Sensores → unidad de procesamiento → algoritmos de control de vuelo → motores.",
          b: "Motores → sensores → algoritmo → procesamiento, siempre.",
          c: "Sensores para percibir y actuadores/motores para ejecutar.",
          d: "Procesamiento para decidir comandos de control."
        },
        correct: ["a", "c", "d"],
        explanation: "El flujo correcto parte de percepción, procesa información, calcula control y actúa."
      },
      {
        id: "m6q20",
        topic: "Mixto final",
        statement: "Marque las afirmaciones correctas:",
        options: {
          a: "Bayes y redes bayesianas usan razonamiento probabilístico.",
          b: "La lógica borrosa usa grados de pertenencia.",
          c: "HMM usa observaciones para inferir estados ocultos.",
          d: "MDP usa acciones para decidir bajo incertidumbre de transición."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Esta pregunta resume diferencias nucleares entre técnicas de incertidumbre, decisión y vaguedad."
      }
    ]
  }
  ,
  {
    id: "modelo-7",
    title: "Modelo 7 — Cálculo de probabilidades",
    subtitle: "Probabilidad, Bayes, redes bayesianas, HMM y MDP con cuentas tipo test.",
    questions: [
      {
        id: "m7q1",
        topic: "Probabilidad básica",
        statement: "Una pareja tiene 4 hijos y cada hijo tiene probabilidad 0.5 de ser masculino. ¿Cuál es la probabilidad de que los 4 tengan el mismo sexo?",
        options: {
          a: "2/16 = 0.125",
          b: "4/16 = 0.25",
          c: "1/16 = 0.0625",
          d: "6/16 = 0.375"
        },
        correct: ["a"],
        explanation: "Los casos de mismo sexo son MMMM y FFFF: 2 casos de 16 equiprobables. Por eso es 2/16 = 0.125."
      },
      {
        id: "m7q2",
        topic: "Probabilidad básica",
        statement: "Con 4 hijos equiprobables M/F, ¿cuál es la probabilidad de que exactamente 2 sean masculinos?",
        options: {
          a: "4/16",
          b: "6/16",
          c: "8/16",
          d: "11/16"
        },
        correct: ["b"],
        explanation: "Hay que elegir en qué 2 posiciones aparecen los varones: C(4,2)=6. Total de casos: 16. Resultado: 6/16."
      },
      {
        id: "m7q3",
        topic: "Probabilidad básica",
        statement: "Con 4 hijos equiprobables M/F, ¿cuál es la probabilidad de que al menos 2 sean masculinos?",
        options: {
          a: "6/16",
          b: "10/16",
          c: "11/16",
          d: "15/16"
        },
        correct: ["c"],
        explanation: "Al menos 2 masculinos incluye 2, 3 o 4 varones: C(4,2)+C(4,3)+C(4,4)=6+4+1=11. Total 16."
      },
      {
        id: "m7q4",
        topic: "Tabla conjunta",
        statement: "En una tabla de 1000 pacientes, los casos con caries son 108, 12, 72 y 8. ¿Cuál es P(caries)?",
        options: {
          a: "0.108",
          b: "0.2",
          c: "0.8",
          d: "200"
        },
        correct: ["b"],
        explanation: "Se suman todos los casos con caries: 108+12+72+8=200. Como hay 1000 pacientes, P(caries)=200/1000=0.2."
      },
      {
        id: "m7q5",
        topic: "Tabla conjunta",
        statement: "En la tabla del dentista, P(¬dolor, enganche) se calcula sumando los casos de enganche y no dolor: caries=72, ¬caries=144, total=1000. ¿Cuál es el valor?",
        options: {
          a: "0.072",
          b: "0.144",
          c: "0.216",
          d: "0.784"
        },
        correct: ["c"],
        explanation: "El evento no fija caries, así que se suman ambos casos: 72+144=216. Dividido entre 1000 da 0.216."
      },
      {
        id: "m7q6",
        topic: "Probabilidad condicional",
        statement: "En la tabla del dentista: dolor y caries son 108+12=120; total con dolor es 108+12+16+64=200. ¿Cuál es P(caries|dolor)?",
        options: {
          a: "0.2",
          b: "0.4",
          c: "0.6",
          d: "0.8"
        },
        correct: ["c"],
        explanation: "P(caries|dolor)=P(caries,dolor)/P(dolor)=120/200=0.6. No se divide entre 1000 al final porque es una condicional entre dos cantidades de la misma tabla."
      },
      {
        id: "m7q7",
        topic: "Bayes",
        statement: "Si P(A)=0.3, P(B|A)=0.8 y P(B)=0.6, ¿cuánto vale P(A|B)?",
        options: {
          a: "0.24",
          b: "0.4",
          c: "0.6",
          d: "0.8"
        },
        correct: ["b"],
        explanation: "Bayes: P(A|B)=P(B|A)P(A)/P(B)=0.8·0.3/0.6=0.24/0.6=0.4."
      },
      {
        id: "m7q8",
        topic: "Probabilidad total",
        statement: "Si P(E)=0.4, P(¬E)=0.6, P(S|E)=0.7 y P(S|¬E)=0.2, ¿cuánto vale P(S)?",
        options: {
          a: "0.28",
          b: "0.12",
          c: "0.40",
          d: "0.50"
        },
        correct: ["c"],
        explanation: "Por probabilidad total: P(S)=P(S|E)P(E)+P(S|¬E)P(¬E)=0.7·0.4+0.2·0.6=0.28+0.12=0.40."
      },
      {
        id: "m7q9",
        topic: "Red bayesiana",
        statement: "En una red A → B → C, con P(A)=0.2, P(B|A)=0.5 y P(C|B)=0.8, ¿cuál es P(A,B,C)? para A,B,C verdaderos?",
        options: {
          a: "0.2+0.5+0.8 = 1.5",
          b: "0.2·0.5·0.8 = 0.08",
          c: "0.5·0.8 = 0.4",
          d: "0.2/0.5/0.8 = 0.5"
        },
        correct: ["b"],
        explanation: "La conjunta se factoriza siguiendo la red: P(A,B,C)=P(A)P(B|A)P(C|B)=0.2·0.5·0.8=0.08."
      },
      {
        id: "m7q10",
        topic: "Naive Bayes",
        statement: "Clasificador Naive Bayes: P(Gripe)=0.67 y P(Temp>37.5|Gripe)=0.80. Sin normalizar, ¿qué peso tiene Gripe dada Temp>37.5?",
        options: {
          a: "0.536",
          b: "0.67",
          c: "0.80",
          d: "1.47"
        },
        correct: ["a"],
        explanation: "El peso sin normalizar es P(Temp>37.5|Gripe)P(Gripe)=0.80·0.67=0.536. Luego habría que normalizar comparando con las otras clases."
      },
      {
        id: "m7q11",
        topic: "Normalización",
        statement: "Si en una inferencia bayesiana los pesos sin normalizar son 0.536 para Gripe y 0.2442 para Neumonía, ¿aproximadamente cuánto vale P(Gripe|evidencia)?",
        options: {
          a: "0.536",
          b: "0.2442",
          c: "0.687",
          d: "0.313"
        },
        correct: ["c"],
        explanation: "Se normaliza dividiendo por la suma: 0.536/(0.536+0.2442)=0.536/0.7802≈0.687."
      },
      {
        id: "m7q12",
        topic: "Inferencia exacta",
        statement: "Si en una red bayesiana se calcula una distribución y salen pesos no normalizados <0.12, 0.18>, ¿cuál es la distribución normalizada?",
        options: {
          a: "<0.12, 0.18>",
          b: "<0.4, 0.6>",
          c: "<0.6, 0.4>",
          d: "<0.3, 0.3>"
        },
        correct: ["b"],
        explanation: "La suma es 0.30. Normalizar: 0.12/0.30=0.4 y 0.18/0.30=0.6."
      },
      {
        id: "m7q13",
        topic: "HMM",
        statement: "En un HMM de salud, P(X0=W)=1, y P(X1=A|X0=W)=0.2. ¿Cuál es P(X0=W, X1=A)?",
        options: {
          a: "1.2",
          b: "0.8",
          c: "0.2",
          d: "0"
        },
        correct: ["c"],
        explanation: "Se multiplica el estado inicial por la transición: P(X0=W)P(X1=A|X0=W)=1·0.2=0.2."
      },
      {
        id: "m7q14",
        topic: "HMM",
        statement: "Con P(X0=W)=1, P(X1=C|W)=0.1, P(X2=C|C)=0.6 y P(X3=W|C)=0.2, ¿cuál es P(W,C,C,W)?",
        options: {
          a: "0.012",
          b: "0.12",
          c: "0.9",
          d: "0.0012"
        },
        correct: ["a"],
        explanation: "Probabilidad de secuencia: 1·0.1·0.6·0.2=0.012. Se multiplican las transiciones de la trayectoria concreta."
      },
      {
        id: "m7q15",
        topic: "HMM emisión",
        statement: "Si el estado oculto es C y P(O=s|C)=0.7, ¿cuál es la probabilidad de observar estornudo estando en C?",
        options: {
          a: "0.3",
          b: "0.7",
          c: "1.0",
          d: "No se puede saber porque es un MDP"
        },
        correct: ["b"],
        explanation: "La probabilidad de emisión se lee directamente: P(O=s|C)=0.7."
      },
      {
        id: "m7q16",
        topic: "Inferencia con evidencia",
        statement: "Supón P(X=2)=1/8, P(door|X=2)=1 y P(door)=2/8. ¿Cuánto vale P(X=2|door)?",
        options: {
          a: "1/8",
          b: "1/2",
          c: "2/8",
          d: "0"
        },
        correct: ["b"],
        explanation: "Bayes: P(X=2|door)=P(door|X=2)P(X=2)/P(door)=1·(1/8)/(2/8)=1/2."
      },
      {
        id: "m7q17",
        topic: "MDP Bellman",
        statement: "En un MDP, si V(A)=2.4, V(B)=1.2, acción p desde A lleva a A con 0.2 y a B con 0.8, coste 1. ¿Coste esperado de p?",
        options: {
          a: "1 + 0.2·2.4 + 0.8·1.2 = 2.44",
          b: "0.2·2.4 + 0.8·1.2 = 1.44",
          c: "1 + 2.4 + 1.2 = 4.6",
          d: "2.4 - 1.2 = 1.2"
        },
        correct: ["a"],
        explanation: "Bellman con costes suma coste inmediato más coste futuro esperado: 1 + 0.48 + 0.96 = 2.44."
      },
      {
        id: "m7q18",
        topic: "MDP Bellman",
        statement: "Si desde A la acción p tiene coste esperado 2.44 y la acción q tiene coste esperado 3.16, en un MDP de costes la política óptima en A elige:",
        options: {
          a: "p",
          b: "q",
          c: "Ambas porque 3.16 es mayor",
          d: "Ninguna, porque no se comparan costes"
        },
        correct: ["a"],
        explanation: "Con costes se elige la acción de menor coste esperado. Como 2.44 < 3.16, se elige p."
      },
      {
        id: "m7q19",
        topic: "Lógica borrosa con números",
        statement: "Si μSeco(40)=0.8 y μSoleado(70000)=0.7, en una regla con antecedente Seco AND Soleado usando max-min, ¿cuál es el grado de activación?",
        options: {
          a: "max(0.8,0.7)=0.8",
          b: "min(0.8,0.7)=0.7",
          c: "0.8+0.7=1.5",
          d: "0.8·0.7=0.56 siempre obligatoriamente"
        },
        correct: ["b"],
        explanation: "En inferencia max-min, AND se calcula con el mínimo. Por eso el grado de activación es 0.7."
      },
      {
        id: "m7q20",
        topic: "Lógica borrosa con números",
        statement: "Si dos reglas activan la misma salida 'riego alto' con grados 0.3 y 0.7, usando agregación por máximo, ¿qué grado queda para esa salida?",
        options: {
          a: "0.3",
          b: "0.7",
          c: "1.0",
          d: "0.21"
        },
        correct: ["b"],
        explanation: "Al agregar por máximo se conserva el mayor grado de activación: max(0.3,0.7)=0.7."
      }
    ]
  }
  ,
  {
    id: "modelo-8",
    title: "Modelo 8 — Ejercicios prácticos estilo examen",
    subtitle: "FIFO/LIFO, ciclos de producción, listas abiertas, A*, representación y cuentas cortas.",
    questions: [
      {
        id: "m8q1",
        topic: "Sistemas de producción: ciclos",
        statement: "WM inicial = {a,b,c,m,n}. Reglas: R1: si a y m entonces +t,-a; R2: si a y t entonces +h,-a; R3: si c entonces +r,-c; R4: si n y r entonces +c,-n,-r; R5: si m y r entonces +c,-m,-r. Estrategia: orden ascendente de reglas y solo reglas que producen hechos nuevos. ¿Cuál es la WM después de 3 ciclos?",
        options: {
          a: "{b,m,t,c}",
          b: "{a,b,c,m,n,t}",
          c: "{b,m,n,t,r}",
          d: "{b,t,c}"
        },
        correct: ["a"],
        explanation: "Ciclo 1: R1 añade t y elimina a: {b,c,m,n,t}. Ciclo 2: R3 añade r y elimina c: {b,m,n,t,r}. Ciclo 3: R4 añade c y elimina n,r: {b,m,t,c}. No puede ser otra porque R2 deja de poder usarse al eliminarse a en el primer ciclo."
      },
      {
        id: "m8q2",
        topic: "Sistemas de producción: ciclos",
        statement: "Con el mismo sistema de la pregunta anterior, ¿cuál es la WM después de 5 ciclos?",
        options: {
          a: "{b,m,t,c}",
          b: "{b,m,t,r}",
          c: "{b,t,c}",
          d: "{a,b,c,m,n}"
        },
        correct: ["c"],
        explanation: "Tras el ciclo 3 queda {b,m,t,c}. Ciclo 4: R3 transforma c en r: {b,m,t,r}. Ciclo 5: R5 transforma m y r en c, eliminando m y r: {b,t,c}."
      },
      {
        id: "m8q3",
        topic: "Agenda FIFO",
        statement: "BH = {a(manuel), b(manuel), b(jose), c(alberto)}. R1: si a(X) y b(Y) entonces c(Y). R2: si a(X) y c(X) entonces d(X). ¿Qué instancias se activan en el primer ciclo?",
        options: {
          a: "R1(X=manuel,Y=manuel)",
          b: "R1(X=manuel,Y=jose)",
          c: "R2(X=manuel)",
          d: "R2(X=alberto)"
        },
        correct: ["a", "b"],
        explanation: "R1 se activa con a(manuel) y con cada b(Y): Y=manuel y Y=jose. R2 necesitaría a(X) y c(X) con el mismo X; existe c(alberto), pero no a(alberto), y todavía no existe c(manuel)."
      },
      {
        id: "m8q4",
        topic: "Agenda FIFO",
        statement: "En el sistema anterior, usando estrategia 'más antigua' (FIFO) y equiparación por lectura, ¿cuál es el orden de hechos nuevos que se insertan?",
        options: {
          a: "c(manuel), c(jose), d(manuel)",
          b: "c(jose), c(manuel), d(manuel)",
          c: "d(manuel), c(manuel), c(jose)",
          d: "c(alberto), d(alberto), d(manuel)"
        },
        correct: ["a"],
        explanation: "FIFO ejecuta primero la instancia más antigua: R1 con Y=manuel, luego R1 con Y=jose. Al aparecer c(manuel), se activa R2(X=manuel), que finalmente añade d(manuel)."
      },
      {
        id: "m8q5",
        topic: "Agenda LIFO",
        statement: "En el mismo sistema, usando estrategia 'más nueva' (LIFO), ¿cuál sería el orden de hechos nuevos insertados?",
        options: {
          a: "c(manuel), c(jose), d(manuel)",
          b: "c(jose), c(manuel), d(manuel)",
          c: "d(manuel), c(jose), c(manuel)",
          d: "c(alberto), c(jose), d(jose)"
        },
        correct: ["b"],
        explanation: "La agenda inicial contiene primero R1(Y=manuel) y después R1(Y=jose). LIFO ejecuta la más nueva: c(jose) primero. Luego queda R1(Y=manuel), que añade c(manuel), y entonces R2 añade d(manuel)."
      },
      {
        id: "m8q6",
        topic: "Orden de reglas",
        statement: "Hechos iniciales: {P,R}. Reglas en orden: R1: si P entonces +J; R2: si R entonces +K,+L; R3: si P y R entonces +L; R4: si L entonces +F. Se elige por orden ascendente y solo reglas que produzcan algún hecho nuevo. ¿Qué regla se ejecuta primero?",
        options: {
          a: "R1",
          b: "R2",
          c: "R3",
          d: "R4"
        },
        correct: ["a"],
        explanation: "Inicialmente R1, R2 y R3 son aplicables y producen hechos nuevos. Al resolver conflicto por orden ascendente, se ejecuta R1. R4 aún no puede ejecutarse porque L no está en la BH."
      },
      {
        id: "m8q7",
        topic: "Orden de reglas",
        statement: "Con el sistema de la pregunta anterior, ¿cuál es la WM tras 3 ciclos?",
        options: {
          a: "{P,R,J,K,L,F}",
          b: "{P,R,J,K,L}",
          c: "{P,R,L,F}",
          d: "{J,K,L,F}"
        },
        correct: ["a"],
        explanation: "Ciclo 1: R1 añade J. Ciclo 2: R2 añade K y L. Ciclo 3: R3 ya no produce nuevo L porque L existe, así que se aplica R4 y añade F. Resultado: {P,R,J,K,L,F}."
      },
      {
        id: "m8q8",
        topic: "Terminación",
        statement: "En un sistema de producción, la ejecución puede terminar cuando:",
        options: {
          a: "No se pueden activar más reglas que produzcan cambios.",
          b: "Una regla ejecuta una señal de parada o halt.",
          c: "Se alcanza un número predefinido de reglas ejecutadas.",
          d: "Se cumple un hecho específico definido como condición de parada."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "La parada no depende solo de una regla PARAR. También puede no haber reglas activables, existir límite de ciclos o alcanzarse una condición concreta."
      },
      {
        id: "m8q9",
        topic: "Representación: lobo, oveja y col",
        statement: "Para mover la oveja de X a Y en el problema lobo-oveja-col, ¿cuál es la regla mejor formulada?",
        options: {
          a: "IF boat(X) AND sheep(X) THEN ¬boat(X), boat(Y), ¬sheep(X), sheep(Y)",
          b: "IF boat(X) AND sheep(X) AND opposite(X,Y) THEN ¬boat(X), boat(Y), ¬sheep(X), sheep(Y)",
          c: "IF boat(X) AND sheep(X) AND opposite(X,Y) THEN boat(Y), sheep(Y)",
          d: "IF boat(X) AND sheep(X) AND opposite(X,Y) THEN ¬boat(X), boat(Y), ¬sheep(X), sheep(Y), ¬opposite(X,Y)"
        },
        correct: ["b"],
        explanation: "Hay que definir Y mediante opposite(X,Y), eliminar barca y oveja de X y añadirlas en Y. No se debe modificar opposite porque es una relación estática del dominio."
      },
      {
        id: "m8q10",
        topic: "Representación: 8-puzzle",
        statement: "En un operador del 8-puzzle que intercambia el hueco con una ficha adyacente, los efectos deben incluir:",
        options: {
          a: "Añadir que el hueco pasa a la casilla de la ficha.",
          b: "Añadir que la ficha pasa a la antigua casilla del hueco.",
          c: "Eliminar la posición antigua del hueco.",
          d: "Eliminar la posición antigua de la ficha."
        },
        correct: ["a", "b", "c", "d"],
        explanation: "Un movimiento correcto sustituye dos hechos antiguos por dos hechos nuevos. Si no retraes los antiguos, el tablero queda inconsistente."
      },
      {
        id: "m8q11",
        topic: "Búsqueda en amplitud",
        statement: "Grafo: A tiene sucesores B,C; B tiene D,E; C tiene F; E tiene G. Inicial A, meta G. En amplitud, generando sucesores en orden alfabético y parando al generar la meta, ¿cuál es la solución?",
        options: {
          a: "A-C-F-G",
          b: "A-B-E-G",
          c: "A-B-D-G",
          d: "A-G"
        },
        correct: ["b"],
        explanation: "Amplitud explora por niveles. Desde A genera B,C. Al expandir B genera D,E. Más tarde al expandir E aparece G. El camino de padres es A-B-E-G."
      },
      {
        id: "m8q12",
        topic: "Búsqueda en profundidad",
        statement: "Con el mismo grafo A→B,C; B→D,E; C→F; E→G, si profundidad toma primero el sucesor alfabético y usa retroceso, ¿qué orden de expansión lleva hasta G?",
        options: {
          a: "A, B, D, E, G",
          b: "A, C, F, B, E, G",
          c: "A, B, C, D, E, G",
          d: "A, G"
        },
        correct: ["a"],
        explanation: "Profundidad entra por B antes que C. Desde B entra en D; D no lleva a meta, retrocede a E y desde E llega a G."
      },
      {
        id: "m8q13",
        topic: "Dijkstra / coste uniforme",
        statement: "Grafo con costes: S→A(2), S→B(5), A→B(1), A→G(10), B→G(2). ¿Cuál es el camino óptimo por coste?",
        options: {
          a: "S→G, coste 0",
          b: "S→B→G, coste 7",
          c: "S→A→G, coste 12",
          d: "S→A→B→G, coste 5"
        },
        correct: ["d"],
        explanation: "Coste uniforme compara costes acumulados. S-A-B-G cuesta 2+1+2=5, menor que S-B-G=7 y S-A-G=12."
      },
      {
        id: "m8q14",
        topic: "A*",
        statement: "Mismo grafo: S→A(2), S→B(5), A→B(1), A→G(10), B→G(2). Heurística: h(S)=4,h(A)=3,h(B)=1,h(G)=0. ¿Qué camino devuelve A* si actualiza B al encontrar mejor coste?",
        options: {
          a: "S→B→G, coste 7",
          b: "S→A→G, coste 12",
          c: "S→A→B→G, coste 5",
          d: "S→A→B, coste 3, aunque no llegue a G"
        },
        correct: ["c"],
        explanation: "Primero A tiene f=2+3=5 y B tiene f=5+1=6, se expande A. Desde A se mejora B con g=3 y f=4. Luego B genera G con coste 5."
      },
      {
        id: "m8q15",
        topic: "A*: parada",
        statement: "En A*, ¿cuándo debe aceptarse normalmente la solución óptima si se trabaja con las condiciones habituales de optimalidad?",
        options: {
          a: "Cuando el objetivo se genera por primera vez, siempre.",
          b: "Cuando el objetivo es seleccionado para expansión con el menor f de la abierta.",
          c: "Antes de calcular g(n).",
          d: "Cuando aparece cualquier nodo con h=0, aunque no sea meta."
        },
        correct: ["b"],
        explanation: "La trampa típica es parar al generar la meta. En A* se acepta al sacar/expandir la meta como mejor nodo abierto; antes podría existir un camino más barato pendiente."
      },
      {
        id: "m8q16",
        topic: "Heurísticas admisibles",
        statement: "Costes reales al objetivo: d*(S)=5,d*(A)=3,d*(B)=2,d*(G)=0. h1={S:4,A:2,B:1,G:0}; h2={S:6,A:3,B:2,G:0}. Marque las correctas:",
        options: {
          a: "h1 es admisible.",
          b: "h2 es admisible.",
          c: "h2 no es admisible porque h2(S)=6 sobreestima d*(S)=5.",
          d: "Una heurística admisible nunca sobreestima el coste real."
        },
        correct: ["a", "c", "d"],
        explanation: "h1 no supera ningún coste real. h2 falla en S porque 6>5, aunque en otros nodos sea igual al coste real."
      },
      {
        id: "m8q17",
        topic: "Red bayesiana: cálculo corto",
        statement: "Red A→B→C. P(A)=0.4, P(B|A)=0.5 y P(C|B)=0.2. ¿Cuál es P(A,B,C) para los tres verdaderos?",
        options: {
          a: "0.4+0.5+0.2=1.1",
          b: "0.4·0.5·0.2=0.04",
          c: "0.5·0.2=0.1",
          d: "0.4/0.5=0.8"
        },
        correct: ["b"],
        explanation: "Se factoriza según la red: P(A,B,C)=P(A)P(B|A)P(C|B)=0.4·0.5·0.2=0.04."
      },
      {
        id: "m8q18",
        topic: "HMM: secuencia",
        statement: "En un HMM/Markov, P(X0=s)=0.6, P(X1=t|X0=s)=0.5 y P(X2=t|X1=t)=0.7. ¿Cuál es P(s,t,t)?",
        options: {
          a: "0.6+0.5+0.7=1.8",
          b: "0.6·0.5·0.7=0.21",
          c: "0.5·0.7=0.35",
          d: "0.6·0.7=0.42"
        },
        correct: ["b"],
        explanation: "En una cadena de Markov se multiplica la probabilidad inicial por las transiciones de la secuencia: 0.6·0.5·0.7=0.21."
      },
      {
        id: "m8q19",
        topic: "MDP: Bellman",
        statement: "En un MDP con costes, V(A)=2, V(B)=5. Acción p desde S cuesta 1 y lleva a A con 0.75 y a B con 0.25. ¿Coste esperado de p?",
        options: {
          a: "1 + 0.75·2 + 0.25·5 = 3.75",
          b: "0.75·2 + 0.25·5 = 2.75",
          c: "1 + 2 + 5 = 8",
          d: "0.75 + 0.25 = 1"
        },
        correct: ["a"],
        explanation: "Bellman suma coste inmediato más valor esperado futuro: 1 + 1.5 + 1.25 = 3.75."
      },
      {
        id: "m8q20",
        topic: "Lógica borrosa: ejercicio corto",
        statement: "Una regla borrosa tiene antecedente A AND B. Para una entrada, μA=0.4 y μB=0.9. Usando max-min, ¿qué grado activa la regla?",
        options: {
          a: "0.4",
          b: "0.9",
          c: "1.3",
          d: "0.36 obligatoriamente"
        },
        correct: ["a"],
        explanation: "En inferencia max-min, AND se calcula con el mínimo: min(0.4,0.9)=0.4. El producto no es el operador usado en este estilo de ejercicios."
      }
    ]
  }
];

function normalizeAnswer(arr) {
  return [...arr].sort().join("");
}

function isCorrect(selected, correct) {
  return normalizeAnswer(selected || []) === normalizeAnswer(correct);
}

function letterList(arr) {
  return [...arr].sort().map((x) => x.toUpperCase()).join(", ");
}

function OptionButton({ letter, text, selected, disabled, onClick, showFeedback, correct }) {
  let cls = "border rounded-xl p-3 text-left transition bg-white hover:bg-slate-50";
  if (selected) cls += " border-blue-500 ring-2 ring-blue-100";
  else cls += " border-slate-200";

  if (showFeedback) {
    if (correct) cls += " bg-emerald-50 border-emerald-500 ring-2 ring-emerald-100";
    else if (selected && !correct) cls += " bg-rose-50 border-rose-500 ring-2 ring-rose-100";
  }

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={cls}>
      <span className="font-bold mr-2">{letter.toUpperCase()}.</span>
      <span>{text}</span>
    </button>
  );
}

function ExamCard({ exam, stats, selected, onClick }) {
  const percent = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
        selected ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-lg text-slate-900">{exam.title}</h3>
          <p className="text-sm text-slate-600 mt-1">{exam.subtitle}</p>
        </div>
        <span className="text-xs font-semibold rounded-full px-3 py-1 bg-slate-100 text-slate-700 whitespace-nowrap">
          {exam.questions.length} preguntas
        </span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-slate-600 mb-1">
          <span>Comprobadas: {stats.total}/{exam.questions.length}</span>
          <span>{percent}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </button>
  );
}

export default function App() {
  const [selectedExamId, setSelectedExamId] = useState(exams[0].id);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [showOnlyWrong, setShowOnlyWrong] = useState(false);

  const selectedExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  const examStats = useMemo(() => {
    const result = {};
    for (const exam of exams) {
      let total = 0;
      let correct = 0;
      for (const q of exam.questions) {
        if (checked[q.id]) {
          total += 1;
          if (isCorrect(answers[q.id] || [], q.correct)) correct += 1;
        }
      }
      result[exam.id] = { total, correct };
    }
    return result;
  }, [answers, checked]);

  const currentStats = examStats[selectedExam.id];

  function toggleAnswer(questionId, letter) {
    const prev = answers[questionId] || [];
    const next = prev.includes(letter) ? prev.filter((x) => x !== letter) : [...prev, letter];
    setAnswers((old) => ({ ...old, [questionId]: next }));
  }

  function checkQuestion(questionId) {
    setChecked((old) => ({ ...old, [questionId]: true }));
  }

  function checkExam() {
    const updates = {};
    selectedExam.questions.forEach((q) => {
      updates[q.id] = true;
    });
    setChecked((old) => ({ ...old, ...updates }));
  }

  function resetExam() {
    const answerCopy = { ...answers };
    const checkedCopy = { ...checked };
    selectedExam.questions.forEach((q) => {
      delete answerCopy[q.id];
      delete checkedCopy[q.id];
    });
    setAnswers(answerCopy);
    setChecked(checkedCopy);
    setShowOnlyWrong(false);
  }

  const visibleQuestions = selectedExam.questions.filter((q) => {
    if (!showOnlyWrong) return true;
    if (!checked[q.id]) return false;
    return !isCorrect(answers[q.id] || [], q.correct);
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-600">Simulador tipo test IA</p>
              <h1 className="text-2xl md:text-3xl font-bold mt-1">Exámenes finales de práctica</h1>
              <p className="text-slate-600 mt-2 max-w-3xl">
                Cada pregunta tiene 4 opciones y pueden ser correctas 1, 2, 3 o 4. Selecciona tus respuestas y comprueba por pregunta o todo el examen.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-5 py-3 text-sm">
              <div className="font-semibold">Examen actual</div>
              <div className="text-slate-600">
                {currentStats.correct}/{currentStats.total || 0} correctas comprobadas
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-[360px_1fr] gap-6">
        <aside className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Modelos</h2>
            <span className="text-sm text-slate-500">{exams.length} tests</span>
          </div>
          <div className="space-y-3">
            {exams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                stats={examStats[exam.id]}
                selected={exam.id === selectedExam.id}
                onClick={() => {
                  setSelectedExamId(exam.id);
                  setShowOnlyWrong(false);
                }}
              />
            ))}
          </div>
        </aside>

        <section className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedExam.title}</h2>
                <p className="text-slate-600 mt-1">{selectedExam.subtitle}</p>
                <p className="text-sm text-slate-500 mt-2">
                  Instrucción: marca todas las opciones correctas. Una pregunta solo cuenta como correcta si marcas exactamente todas las correctas y ninguna incorrecta.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={checkExam} className="rounded-xl px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700">
                  Comprobar todo
                </button>
                <button onClick={() => setShowOnlyWrong((x) => !x)} className="rounded-xl px-4 py-2 bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200">
                  {showOnlyWrong ? "Ver todas" : "Ver fallos"}
                </button>
                <button onClick={resetExam} className="rounded-xl px-4 py-2 bg-white border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50">
                  Reiniciar
                </button>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-2xl font-bold">{selectedExam.questions.length}</div>
                <div className="text-xs text-slate-500">Preguntas</div>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3">
                <div className="text-2xl font-bold text-emerald-700">{currentStats.correct}</div>
                <div className="text-xs text-slate-500">Correctas</div>
              </div>
              <div className="rounded-xl bg-rose-50 p-3">
                <div className="text-2xl font-bold text-rose-700">{currentStats.total - currentStats.correct}</div>
                <div className="text-xs text-slate-500">Falladas</div>
              </div>
            </div>
          </div>

          {visibleQuestions.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-600">
              No hay fallos comprobados en este modelo.
            </div>
          )}

          {visibleQuestions.map((q, index) => {
            const selected = answers[q.id] || [];
            const isChecked = !!checked[q.id];
            const ok = isChecked && isCorrect(selected, q.correct);
            return (
              <article key={q.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900">Pregunta {selectedExam.questions.findIndex((item) => item.id === q.id) + 1}</span>
                      <span className="text-xs font-semibold rounded-full px-2 py-1 bg-slate-100 text-slate-600">{q.topic}</span>
                      {isChecked && (
                        <span className={`text-xs font-bold rounded-full px-2 py-1 ${ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                          {ok ? "Correcta" : "Fallada"}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-lg font-medium leading-relaxed">{q.statement}</p>
                  </div>
                  <button onClick={() => checkQuestion(q.id)} className="rounded-xl px-4 py-2 bg-slate-900 text-white font-semibold hover:bg-slate-700 whitespace-nowrap">
                    Comprobar
                  </button>
                </div>

                <div className="mt-4 grid gap-3">
                  {Object.entries(q.options).map(([letter, text]) => (
                    <OptionButton
                      key={letter}
                      letter={letter}
                      text={text}
                      selected={selected.includes(letter)}
                      disabled={false}
                      onClick={() => toggleAnswer(q.id, letter)}
                      showFeedback={isChecked}
                      correct={q.correct.includes(letter)}
                    />
                  ))}
                </div>

                {isChecked && (
                  <div className={`mt-4 rounded-2xl p-4 border ${ok ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
                    <div className="font-bold mb-1">{ok ? "Bien" : "Revisión"}</div>
                    <p className="text-sm text-slate-700">
                      Tu respuesta: <strong>{selected.length ? letterList(selected) : "sin responder"}</strong>. Respuesta correcta: <strong>{letterList(q.correct)}</strong>.
                    </p>
                    <p className="text-sm text-slate-700 mt-2">{q.explanation}</p>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
