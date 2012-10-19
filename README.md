jQueryCustomSelect
============

Iniciar CustomSelect
--------------------
&lt;input type="hidden" id="item1" class="customselect" data-overload="5|verde,1|amarelo,2|verde,3|vermelho,4|azul" data-label="Selecione uma cor" value="" /&gt;

	$('#item1').customselect();


	
Iniciar CustomSelect com Callback no Click da linha
---------------------------------------------------
	$('#item2').customselect({callback: function(){ console.log(['Callback']); }});



Iniciar CustomSelect read-only
------------------------------
&lt;input type="hidden" id="item3" class="customselect" data-readonly="true" data-overload="" data-label="" value="" /&gt;

	$('#item3').customselect();



Adicionar novo item
-------------------
	$('#item1').customselect('addNewItem', {id: '10', text: 'Novo Item'});



Atualizar lista com base no atributo data-overload
--------------------------------------------------
	$('#item1').customselect('refresh');