start(L1, Sugg) :- stat(L1, [], Sugg).

stat([], Reste, Sugg) :- words("stat", W), stat([W], Reste, Sugg1), append([W], Sugg1, Sugg).
stat(["if"|L], Reste, Sugg) :- paren_expr(L, R1, Sugg1), paren_expr(R1, R2, Sugg2), Reste=R2, append([Sugg1, Sugg2], Sugg).
stat(["if"|L], Reste, Sugg) :- paren_expr(L, R1, Sugg1), paren_expr(R1, R2, Sugg2), else(R2, R3, Sugg3), Reste=R3, append([Sugg1, Sugg2, Sugg3], Sugg).
stat(["recurs"|L], Reste, Sugg) :- paren_expr(L, R1, Sugg1), stat(R1, R2, Sugg2), else(R2, R3, Sugg3), Reste=R3, append([Sugg1, Sugg2, Sugg3], Sugg).
stat([X], Reste, Sugg) :- complete("stat", X, W), stat([W], Reste, Sugg1), append([W], Sugg1, Sugg).

else([], Reste, Sugg) :- words("else", W), else([W], Reste, Sugg1), append([W], Sugg1, Sugg).
else(["else"|L], Reste, Sugg) :- paren_expr(L, Reste, Sugg).
else([X], Reste, Sugg) :- complete("else", X, W), else([W], Reste, Sugg1), append([W], Sugg1, Sugg).

paren_expr([], Reste, Sugg) :- words("paren_expr", W), paren_expr([W], Reste, Sugg1), append([[W], Sugg1], Sugg). 
paren_expr([X|L], Reste, Sugg) :- words("paren_expr", X), Reste=L, Sugg=[].
paren_expr([X], Reste, Sugg) :- complete("paren_expr", X, W), paren_expr([W], Reste, Sugg1), append([W], Sugg1, Sugg).

complete(Type, Deb, W) :- not(words(Type, Deb)), words(Type, Mot), string_length(Deb, Len), sub_string(Mot, Len, _, 0, Apr), string_concat(Deb, Apr, Mot), W=Mot, !.

words("stat", W) :- member(W, ["if"]).	% Ne pas mettre les cas recursif dans ces listes
words("paren_expr", W) :- member(W, ["paren", "temp", "foo"]).
words("else", W) :- member(W, ["else"]).

%start(["if", "paren", "paren", "else"], Sugg).
%
%append_all( ([["allo"],["salut"],["bonjour"]]), Sum).
%
%append_all( ["allo","salut","bonjour"], Sum).
%
%stat: "if" paren_expr paren_expr 
%      "if" paren_expr paren_expr "else" paren_expr
%      "recurs" paren_expr stat "else" paren_expr
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
%Le cas non-vide, mais qui ne "marche pas":
%	On a un seul element dans la liste, mais il n'est pas un des mots du type. Alors, on essaie de le completer et on appelle le type sur le mot complete.
%	