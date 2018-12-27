$(document).ready(function (){ 
    //Voltar ao topo
    $('.topo').hide();
    
    $(window).scroll(function() {
        if($(this).scrollTop() > 100) {
            $('.topo').fadeIn();
        } else {
            $('.topo').fadeOut();
        }
    });
    
    $('.topo').click(function () {
       $('body, html').animate({scrollTop: 0}, 200) 
    });
    
    //Tooltip JQuery UI
    $(function() {
        $('span').tooltip();
    });
    
    //Banner de Imagens
    $('.banner').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000
    });
    
    //Menu Drop Down
    $(function() {
        $('#main-menu').smartmenus({
            mainMenuSubOffsetX: -1,
            subMenusSubOffsetX: 10,
            subMenusSubOffsetY: 0
        });
    });
    
    //Abas
    $(function() {
        $('#abas').tabs();
    });
    
    //Datapicker JQuery UI
    $( function() {
        $('#dataNascimento').datepicker({
            minDate: new Date(1940, 0, 1), //Data mínima 01/01/1940
            maxDate: '+0d', //Data máximo "HOJE"
            showButtonPanel: true,
            dateFormat: 'dd/mm/yy',
            dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
            dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
            dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
            nextText: 'Próximo',
            prevText: 'Anterior',
            closeText: "Fechar",
            currentText: "Hoje",
            hideIfNoPrevNext: true,
            showAnim: 'slideDown',
            onClose: function() {
                $("#dataNascimento").blur();
            }
        });
    });
    
    //Função de Buscar o CEP
    function limpa_cep() {
        $("#cep").val("");
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#estado").val("");
    }
    
    $('#cep').blur(function() {
        //Elimina "caracteres" e deixa o CEP somente com números
        var cep = $(this).val().replace(/\D/g, '');
        
        if (cep != '') {
            //Expressão regular para validar o CEP
            var validaCep = /^[0-9]{8}$/;
            
            if (validaCep.test(cep)) {
                $("#rua").val("Carregando...");
                $("#bairro").val("Carregando...");
                $("#cidade").val("Carregando...");
                $("#estado").val("...");
                
                $.getJSON("https://viacep.com.br/ws/"+cep+"/json/", function(dados) {
                    if (!("erro" in dados)) {
                        $('#rua').val(dados.logradouro);
                        $('#bairro').val(dados.bairro);
                        $('#cidade').val(dados.localidade);
                        $('#estado').val(dados.uf);
                        
                    } else {
                        alert ('CEP Não Encontrado');
                        limpa_cep();
                    } //end if (!("erro" in dados)) {
                });    
            } else {
                alert ('CEP Inválido');
                limpa_cep();
            }//end if (validaCep.test(cep)) 
        } else {
            limpa_cep();
            console.log('CEP Vazio');
        }//end if (cap != '')       
    });
    
    //Método adicional para datas no formato DD-MM-AAAA
    $.validator.addMethod("date", function(value, element) {  
        var check = false;  
        var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;  
        if(re.test(value)){  
            var adata = value.split('/');  
            var gg = parseInt(adata[0],10);  
            var mm = parseInt(adata[1],10);  
            var aaaa = parseInt(adata[2],10);  
            var xdata = new Date(aaaa,mm-1,gg);              
            if ((xdata.getFullYear() == aaaa) && (xdata.getMonth () == mm - 1) && (xdata.getDate() == gg)) {     
                var dataDigitada = gg+'/'+mm+'/'+aaaa; 
                var data1 = dataDigitada;
                var partesData1 = data1.split("/");
                var data = new Date(partesData1[2], partesData1[1] - 1, partesData1[0]);
                var dataInicial = '01/01/1940';
                var dataInicialComp = new Date(dataInicial.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$2/$1/$3'));
                
                //Se a data inserida for maior que "HOJE"
                if (data > new Date()) {
                    check = false;
                } else
                //Se a data inserida for menor que a data inicial
                if (data < dataInicialComp) {
                    check = false;
                } else { 
                    check = true; 
                }
            } else  
                check = false;  
        } else  
            check = false;  
        return this.optional(element) || check;  
      },  
      "Insira uma data válida"  
    );  
    
    //Validação de Formulário
    $('#formulario').validate({
        rules: {
            nome: {
                required: true,
                minlength: 5    
            },
            email: {
                required: true,
                email: true     
            },
            telefone: {
                required: true,
                minlength: 14     
            },
            dataNascimento: {
                required: true,
                date: true
            },
            cep: {
                required: true     
            },
            cidade: {
                required: true     
            },
            estado: {
                required: true     
            },
            rua: {
                required: true     
            },
            bairro: {
                required: true     
            },
            numero: {
                required: true     
            }    
        },
        messages: {
            nome: {
                required: "Campo Obrigatório",
                minlength: "O nome deve ter no mínímo 5 digitos"    
            },
            email: {
                required: "Campo Obrigatório",
                email: "Email Inválido"    
            },
            telefone: {
                required: "Campo Obrigatório",
                minlength: "O telefone deve ter no mínimo 10 digitos (com DDD)",
                    
            },
            dataNascimento: {
                required: "Campo Obrigatório",  
            },
            cep: {
                required: "Campo Obrigatório"     
            },
            cidade: {
                required: "Campo Obrigatório"     
            },
            estado: {
                required: "Campo Obrigatório"     
            },
            rua: {
                required: "Campo Obrigatório"     
            },
            bairro: {
                required: "Campo Obrigatório"     
            },
            numero: {
                required: "Campo Obrigatório"     
            }    
        }    
    });
    
    //Galeria de Imagens
    $('#galeria').imagesGrid({
        images: [
            {src: 'imagens/01.jpg', alt: 'Imagem 01', title: 'Imagem 01'},
            {src: 'imagens/02.jpg', alt: 'Imagem 02', title: 'Imagem 02'},
            {src: 'imagens/03.jpg', alt: 'Imagem 03', title: 'Imagem 03'},
            {src: 'imagens/04.jpg', alt: 'Imagem 04', title: 'Imagem 04'},
            {src: 'imagens/05.jpg', alt: 'Imagem 05', title: 'Imagem 05'},
            {src: 'imagens/06.jpg', alt: 'Imagem 06', title: 'Imagem 06'},
            {src: 'imagens/07.jpg', alt: 'Imagem 07', title: 'Imagem 07'},
            {src: 'imagens/08.jpg', alt: 'Imagem 08', title: 'Imagem 08'},
            {src: 'imagens/09.jpg', alt: 'Imagem 09', title: 'Imagem 09'},
            ],
                cells: 5,
                getViewAllText: function(imagesCount) {
                    return 'Ver galeria completa';
                }
    }); 
    
    //Máscaras
    $('#cep').mask('00000-000');
    $('#dataNascimento').mask('00/00/0000');
    //Especial para máscara de telefone 8 ou 9 digitos
    var mascaraTelefone = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    mascaraOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(mascaraTelefone.apply({}, arguments), options);
    }};

    $('#telefone').mask(mascaraTelefone, mascaraOptions);
});