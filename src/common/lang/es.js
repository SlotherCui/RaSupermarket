import esLocale from 'element-ui/lib/locale/lang/es'
const es = {
  message: {
    'lang': 'idioma',
    'userlogin': 'login de usuario',
    'username': 'nombre de usuario',
    'password': 'contraseña',
    'remeber': 'Recordar contraseña',
    'login': 'Login',
    // 导航栏选项
    'other_setting': 'Other settings',
    'shop_information': 'Gestión de la información',
    'sells': 'Registro de ventas',
    'chart': 'gráfico',
    'shop_change_price': 'Cambio de precio de commodities',
    'shop_change_relation': 'relación de cambio de precio',
    'common_goods': 'Supply goods',
    'My_goods': 'Mantenimiento del producto',
    // 商品表表头
    'goods_barcode': 'Codigo de barras',
    'goods_name': 'nombre del producto',
    'goods_model': 'Modelo de especificación',
    'goods_price': 'price',
    'goods_describe': 'Descripción del producto',
    'goods_supplier_id': 'Número de proveedor:',
    'goods_supplier': 'Nombre del proveedor:',
    'to': 'a',
    'min_price': 'precio más bajo',
    'max_price': 'precio más alto',
    'supplier_user_name': 'username:',
    'supplier_company': 'Supplier company:',
    'supplier_addr': 'Dirección del proveedor:',
    'supplier_tel': 'Teléfono del proveedor:',
    'supplier_contact': 'Contacto:',
    // actualizar
    'commodity_barcode': 'número de código de barras',
    'commodity_name': 'nombre del producto',
    'commodity_specification': 'Modelo de especificación',
    'commodity_price': 'precio',
    'commodity_description': 'Descripción del producto',
    // Detalles del producto, aún es necesario traer la información del encabezado del producto anterior
    'goods_brand': 'marca comercial del producto',
    'goods_producer': 'fabricantes de productos',
    'goods_img': 'Imagen del producto',
    'goods_update_time': 'Modificar el tiempo',
    // actualizar
    'commodity_brand': 'marca comercial de productos básicos',
    'commodity_producer': 'Fabricantes de productos',
    'commodity_piclink': 'Imagen del producto',
    'create_time': 'Modificar hora',
    'supplier_min_price': 'precio de referencia',
    'suggest_price': 'Precio recomendado',
    'commodity_price_before': 'Precio original',
    // registro de ventas
    // 'order_id': 'número de venta',
    // 'order_price': 'Precio total de venta',
    // 'order_num': 'Ventas totales',
    // 'order_time': 'tiempo de venta',

    'order_id': 'número de venta',
    'order_all_price': 'Precio total de venta',
    'order_commodity_sum': 'Ventas totales',
    'order_create_time': 'tiempo de venta',
    // artículos de venta específicos
    'commodity_current_price': 'Precio unitario de los productos básicos',
    'commodity_each_count': 'Número de artículos',
    // 'order_goods_barcode': 'número de código de barras',
    // 'order_goods_name': 'nombre del producto',
    // 'order_goods_model': 'Modelo de especificación',
    // 'order_goods_num': 'Número de productos',
    // 'order_goods_price': 'precio del producto',
    // Información comercial
    'supermarket_id': 'número de supermercado',
    'supermarket_img': 'Supermarket avatar',
    'supermarket_name': 'nombre del supermercado',
    'supermarket_manager_name': 'Responsable del supermercado',
    'supermarket_piclink': 'Enlace de avatar de supermercado',
    'supermarket_address': 'dirección del supermercado',
    'supermarket_tel': 'Teléfono del supermercado',
    'supermarket_tax': 'número impositivo del supermercado',
    'supermarket_email': 'Buzón de supermercado',
    'supermarket_decription': 'Descripción del supermercado',
    'supermarket_state': 'estado de asociación de supermercados',
    'UserID': 'ID de supermercado',
    'change_password': 'Cambiar contraseña',
    'old_password': 'Contraseña antigua',
    'new_password': 'nueva contraseña',
    'please_old_password': 'Por favor ingrese la contraseña anterior',
    'please_new_password': 'Por favor ingrese una nueva contraseña',
    // operación
    'query': 'consulta',
    'add': 'Add',
    'add1': 'Add',
    'add2': 'Nuevo',
    'operation': 'operación',
    'open': 'on',
    'edit': 'editar',
    'delete': 'delete',
    'batchDelete': 'Bulk delete',
    'confirm': 'confirmar revision',
    'team_price_change': 'Cambio de precio de grupo',
    'relation_price_change': 'Cambio de precio de enlace',
    'put_in': 'Agregar a la biblioteca del producto',
    'apply': 'Apply',
    'cancel': 'Cancel',
    'commit': 'confirmar',
    'prompt': 'prompt',
    'close': 'close',
    // Otros marcadores de posición, etc ...
    'please_input_bar': 'Por favor ingrese un número de código de barras',
    'please_input_sid_bar': 'Introduzca un número de comerciante',
    'please_input_supplier_bar': 'Por favor ingrese el nombre del proveedor',
    'please_input_newprice': 'Por favor ingrese un nuevo precio',
    'please_input_number': 'Por favor ingrese un número',
    'no_add_one': 'No hay información de ventas, puede agregar un',
    'no_sup': 'No hay tal comerciante, o se ha agregado una asociación',
    'file_fail': 'Error al subir',
    'file_success': '¡Subido exitosamente! ',
    'upload_fail_server': 'Falló la carga, el lado del servidor no responde',
    'upload_fail_request': 'Error al cargar, paquete de solicitud fallido',
    'delete_success': 'eliminar con éxito',
    'change_state_success': 'Switch success',
    'change_state_fail': 'Falló el cambio',
    'delete_confirm': '¿Está seguro de eliminar el negocio seleccionado?',
    'delete_confirm1': '¿Confirma borrar el producto seleccionado?',
    'has_in': 'El elemento ya está en la biblioteca del producto',
    'add_success': 'Agregar éxito',
    'add_fail': 'Agregar fallo',
    'save_success': 'Guardar con éxito',
    'save_fail': 'Guardar fallido',
    'about': 'Sobre nosotros',
    'feedback': 'Feedback',
    'adding_goods': 'Agregar elemento',
    'adding_price': 'Add price',
    'delete_fail': 'borrado fallido',
    'upload_success': 'Carga exitosa',
    'upload_fail': 'Error al subir',
    'barcode_must_13': 'El código de barras debe tener 13 dígitos',
    'image_must': '¡El archivo de carga solo puede tener formato de imagen!',
    'onemb_must': '¡El tamaño del archivo subido no puede exceder de 1MB!',
    'upload_confirm': '¿Está seguro de enviar? ',
    'down_load': 'Descargar',
    'not_sell': 'Este artículo no está en venta',
    'change_success': 'Modificado satisfactoriamente',
    'change_fail': 'Falló la modificación',
    'top_10': 'Sales TOP10',
    'loading_fail': 'Falló la carga',
    'sales_volume': 'Sales',
    'total': 'total',
    'please_input_sales_number': 'Por favor ingrese el número de venta',
    'start_time': 'start time',
    'end_time': 'end time',
    'submit': 'Submit',
    'err': 'Error desconocido',
    'suggestion': 'tu sugerencia',
    'my_message': 'Mi mensaje',
    'setting': 'Configuración',
    'exit': 'Salir de inicio de sesión',
    'exit_confirm': '¿Has cerrado sesión?'
  },
  ...esLocale
}

export default es
