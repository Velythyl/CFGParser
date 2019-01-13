start(L1, Sugg) :- stat(L1, [], Subsugg), flatten(Subsugg, Sugg).
stat([], Reste, Sugg) :- stat_words(W), stat([W], Reste, Sugg1), append([W], Sugg1, Sugg).
stat(["if"|L], Reste, Sugg) :- paren_expr(L, R1, Sugg1), paren_expr(R1, R2, Sugg2), Reste=R2, append_all([Sugg1, Sugg2], Sugg).
stat(["if"|L], Reste, Sugg) :- paren_expr(L, R1, Sugg1), paren_expr(R1, R2, Sugg2), else(R2, R3, Sugg3), Reste=R3, append_all([Sugg1, Sugg2, Sugg3], Sugg).
else([], Reste, Sugg) :- else_words(W), else([W], Reste, Sugg1), append([W], Sugg1, Sugg).
else(["else"|L], Reste, Sugg) :- paren_expr(L, Reste, Sugg).
paren_expr([], Reste, Sugg) :- paren_expr_words(W), paren_expr([W], Reste, Sugg2), append_all([W, Sugg2], Sugg). 
paren_expr(["paren"|L], Reste, Sugg) :- Reste=L, Sugg=[].

append_all([[Lone]], [Lone]) :- !.
append_all([Lone], [Lone]) :- !.
append_all([[Subl]|List], Sum) :- append_all(List, Subsum), append([Subl], Subsum, Sum), !.
append_all([Ele|List], Sum) :- append_all(List, Subsum), append([Ele], Subsum, Sum), !.

stat_words(W) :- member(W, ["if", "temp", "foo"]).	% Ne pas mettre les cas recursif dans ces listes
paren_expr_words(W) :- member(W, ["paren"]).
else_words(W) :- member(W, ["else"]).

%start(["if", "paren", "paren", "else"], Sugg).
%
%append_all( ([["allo"],["salut"],["bonjour"]]), Sum).
%
%append_all( ["allo","salut","bonjour"], Sum).
