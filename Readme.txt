Игра морской бой.
Поля для игры создаются путём генерации массива 10х10 тегов div (это отдельная ячейка с id = cell_x_y ).
Изначально всем ячейкам на поле присваиваем класс 'w' - water.
реализован алгоритм рандомной расстановки кораблей на поле игрока и компьютера. 
Случайным образом получаем ячейку (первую палубу будущего корабля), направление корабля (горизонтальное/вертикальное),  
знаем заранее на сколько палуб будем строить корабль.
Перед тем как полностью генерить весь корабль, по координате первой палубы проверяем не выйдет ли корабль за границу поля, если выходит,
то заново генерим случайным образом первую палубу и снова проверяем на границы.
Так же проверяем ближайшие точки по периметру будущего корабля, на налицие у них каласса 's', если такие точки есть в окрестности корабля - 
то снова генерим первую палубу и т.д.
Если будущий корабль не выходит за границы поля и в окрестных точках (и в точках самого корабля) нет других кораблей - достраиваем корабль 
(то есть присваиваем класс 's' данным ячейкам)

Логика стрельбы. 
Первым стреляет человек. При клике по ячейке на поле компьютера определяем есть ли у неё класс 's', при промахе (попали в ячейку с классом 'w') 
ф-ция возвращает true и запускается случайный выстрел по полю игрока. При попадании (у элемента меняем класс 's' на 'h' - hit) 
компьютер начинает обстреливать окhестность раненого корабля, при повторном попадании вычисляется направление корабля 
горизонтальное или вертикальное и обстрел уже идёт в этом направлении, а не случайно. Когда корабль уничтожен, 
из оставшихся необстреленных ячеек вычитаются прилегающие к кораблю пустые ячейки (присваиваем им класс 'm' - miss)
Так же при уничтожении корабля (на поле компьютера и человека) проверяется размерность массива ячеек 
с классом 's' (то есть оставшиеся не подбитые корабли), если таких элементов 0, то игрок на чьём поле они закончились - проиграл.
