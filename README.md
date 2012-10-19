jQueryCustomSelect
============

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
	
	
Setar CustomSelect Read-and-Write
------------------------------

	$('#item3').customselect('toReadAndWrite');	


Adicionar novo item
-------------------
	$('#item1').customselect('addNewItem', {id: '10', text: 'Novo Item'});



Atualizar lista com base no atributo data-overload
--------------------------------------------------
	$('#item1').customselect('refresh');