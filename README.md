jQueryCustomSelect
============

Demo
--------------------
http://tilowr.com.br/github/jQueryCustomSelect/jquery.customselect.html



Iniciar CustomSelect
--------------------
&lt;input type="hidden" id="item1" class="customselect" data-overload="5|verde,1|amarelo,2|verde,3|vermelho,4|azul" data-label="Selecione uma cor" value="" /&gt;

	$('#item1').customselect();


	
Iniciar CustomSelect com Callback no onChange
---------------------------------------------------
	$('#item2').customselect({onChange: function(){ console.log(['onChange']); }});



Iniciar CustomSelect read-only
------------------------------
&lt;input type="hidden" id="item3" class="customselect" data-readonly="true" data-overload="" data-label="" value="" /&gt;

	$('#item3').customselect();


	
Iniciar CustomSelect com ordenação DESC
---------------------------------------
&lt;input type="hidden" id="item3" class="customselect" data-ordination="desc" data-overload="" data-label="" value="" /&gt;

	$('#item3').customselect();



Limite de Linhas Exibidas ( Com base na altura da primeira linha )
&lt;input type="hidden" id="item5" class="customselect" data-limit="3" data-overload="5|verde,1|amarelo,2|verde,3|vermelho,4|azul,6|verde,7|amarelo,8|verde,9|vermelho,10|azul" /&gt;

	$('#item5').customselect();
	

	
Setar CustomSelect Read-and-Write
------------------------------

	$('#item3').customselect('toReadAndWrite');	



Adicionar novo item
-------------------
	$('#item1').customselect('addNewItem', {id: '10', text: 'Novo Item'});



Atualizar lista com base no atributo data-overload
--------------------------------------------------
	$('#item1').customselect('refresh');