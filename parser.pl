start(L1, Sugg) :- stat(L1, [], Subsugg), flatten(Subsugg, Sugg).

stat([], Reste, Sugg) :- stat_words(W), stat([W], Reste, Sugg1), append([W], Sugg1, Sugg).
stat(["if"|L], Reste, Sugg) :- paren_expr(L, R1, Sugg1), paren_expr(R1, R2, Sugg2), Reste=R2, append_all([Sugg1, Sugg2], Sugg).
stat(["if"|L], Reste, Sugg) :- paren_expr(L, R1, Sugg1), paren_expr(R1, R2, Sugg2), else(R2, R3, Sugg3), Reste=R3, append_all([Sugg1, Sugg2, Sugg3], Sugg).

else([], Reste, Sugg) :- else_words(W), else([W], Reste, Sugg1), append([W], Sugg1, Sugg).
else(["else"|L], Reste, Sugg) :- paren_expr(L, Reste, Sugg).

paren_expr([], Reste, Sugg) :- paren_expr_words(W), paren_expr([W], Reste, Sugg2), append_all([W, Sugg2], Sugg). 
paren_expr([X|L], Reste, Sugg) :- paren_expr_words(X), Reste=L, Sugg=[].

append_all([[Lone]], [Lone]) :- !.	% Liste imbriquée
append_all([Lone], [Lone]) :- !.	% Item seul
append_all([[Subl]|List], Sum) :- append_all(List, Subsum), append([Subl], Subsum, Sum), !.	% Liste imbriquée
append_all([Ele|List], Sum) :- append_all(List, Subsum), append([Ele], Subsum, Sum), !.		% Item seul
       
stat_words(W) :- member(W, ["if"]).	% Ne pas mettre les cas recursif dans ces listes
paren_expr_words(W) :- member(W, ["paren", "temp", "foo"]).
else_words(W) :- member(W, ["else"]).

%start(["if", "paren", "paren", "else"], Sugg).
%
%append_all( ([["allo"],["salut"],["bonjour"]]), Sum).
%
%append_all( ["allo","salut","bonjour"], Sum).
%
%stat: "if" paren_expr paren_expr 
%        "if" paren_expr paren_expr "else" paren_expr
%
%paren_expr: "paren", "temp", ou "foo"
%
%Chaque type a son cas vide, de forme type([], Reste, Sugg). Ceci est le traitement de suggestion: on génère les mots possible pour le type, on appelle le type sur chacun de ses mots, et on ajout le mot aux Sugg.
%Chaque type a ses cas non-vides, de forme type([X|L], Reste, Sugg). Ceci est le traitement de phrase déjà écrite. 
%
%Le cas vide ne PEUT PAS traiter de cas récursifs (autrement dit, on ne peut mettre des cas récursifs dans la liste de mots du type), puisque prolog entrera dans une boucle infinie.
%Le cas non-vide peut avoir deux formes: 
%	Soit X est un littéral placé dans la tête de la déclaration du type, comme type(["mot"|L], Reste, Sugg). Ceci ne laisse place qu'à une seule option au début du type.
%	Soit X est vérifié dans le corps de la déclaration par un appel à type_words(X). Ceci laisse place à plusieurs options en début de type.
%	
%	On pourrait traiter le premier cas avec la méthode du deuxième, mais cette façon de faire évite des appels de fonctions et rend la lecture humaine plus rapide.
