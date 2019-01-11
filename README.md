# Parser

http://tau-prolog.org/examples/likes

program(L1, Sugg) :- stat(L1, [], Sugg).
stat([], Reste, Sugg) :- stat(_, Reste, Sugg).
stat([X|L], Reste, Sugg) :- X="if", paren_expr(L, R1, Sugg1), stat(R1, R2, Sugg2), Reste=R2, append(Sugg1, Sugg2, Sugg).
paren_expr([], Reste, Sugg) :- paren_expr(_, Reste, Sugg).
paren_expr([X|L], Reste, Sugg) :- X="paren", Reste=L, Sugg=[].
