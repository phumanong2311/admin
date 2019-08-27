/**
 * Created by phu on 11/7/17.
 */

var dataEntries = [10, 15, 20, 50, 100]
var ta_current_page_size = dataEntries[0]
var ta_curent_page = 1
var ta_params = null
var ta_class_paging = 'ta-paging'
var ta_sort_name = ''
var ta_sort = ''
var ta_search_show = {
    placeholder: 'search...',
    label: 'label'
}
var ta_column_number = 0
var ta_text_entries = {
    show: 'Show ',
    entries: ' entries'
}
var ta_isColumn_action = false
/**
 * function init taTable
 */
var taInit = function(obj) {
    ta_params = obj
    checkInit()
    taCreateDom(ta_params.id)
    taLoadContentTable(ta_params)
    loadGrid()
}


var checkInit = function() {
    ta_column_number = ta_params.column_show.length
    if (ta_params.entries) {
        dataEntries = ta_params.entries
        ta_current_page_size = dataEntries[0]
    }

    if (ta_params.searchText) {
        ta_search_show = ta_params.searchText
    }

    if (ta_params.entriesText) {
        ta_text_entries = ta_params.entriesText
    }

    if (ta_params.column_action) {
        
        if (ta_params.column_action.columnShow != null && ta_params.column_action.show && ta_params.column_action.item) {
            // alert(1)
            var columnShow = ta_params.column_action.columnShow
            var show = ta_params.column_action.show
            var item = ta_params.column_action.item
            if (typeof columnShow === 'number' && columnShow > 0 && show.length === columnShow && item.length === columnShow) {
                ta_isColumn_action = true
            }  
        }
    }
}

/**
 * function : create dom cover grid
 * params
 * param ta_docId : string element
 * **/
var taCreateDom = function(ta_docId) {
    // `element` is the element you want to wrap
    var ta_el = document.getElementById(ta_docId)
    var parent = ta_el.parentNode
    var wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'ta-container')

    // set the wrapper as child (instead of the element)
    parent.replaceChild(wrapper, ta_el)
    // set element as child of wrapper
    wrapper.appendChild(taEntries()) // create entries in grid view
    wrapper.appendChild(taSearchBox()) // create box search in grid view
    wrapper.appendChild(ta_el) // create table grid
    wrapper.appendChild(taCreatePaging())
}

/**
 * function: create search box
 */
var taSearchBox = function() {
    var ta_search_box = document.createElement('div')
    ta_search_box.setAttribute('class', 'ta-search-box')
    var ta_input_search = document.createElement('input')
    ta_input_search.setAttribute('placeholder', (ta_search_show.placeholder) ? ta_search_show.placeholder : 'Search...')
    ta_input_search.setAttribute('class', 'ta-search-key')
    ta_input_search.setAttribute('data-search', true)
    var ta_search_label = document.createElement('label')
    var ta_label_text = document.createTextNode((ta_search_show.label) ? ta_search_show.label : 'Search')
    ta_search_label.appendChild(ta_label_text)
    ta_search_label.appendChild(ta_input_search)
    ta_search_box.appendChild(ta_search_label)

    ta_input_search
    let time = null
    ta_input_search.onkeydown = function () {
    clearTimeout(time)

    time = setTimeout(function () {
        ta_curent_page = 1
        loadGrid()
    }, 500)
    }
    return ta_search_box
}

/**
 * function: create entries
 */
var taEntries = function() {
    var ta_entries_box = document.createElement('div')
    ta_entries_box.setAttribute('class', 'ta-entries')
    var ta_label_entries = document.createElement('label')
    var text_label_entries = document.createTextNode((ta_text_entries.show)? ta_text_entries.show : 'Show ')
    var ta_dropdown_entries = document.createElement('select')
    dataEntries.forEach(function(v, k) {
        var ta_option = document.createElement('option')
        ta_option.setAttribute('value', v)
        var ta_text_option = document.createTextNode(v)
        ta_option.appendChild(ta_text_option)
        ta_dropdown_entries.appendChild(ta_option)
    })
    ta_dropdown_entries.addEventListener('change', function(e) {
        ta_current_page_size = e.target.value
        ta_curent_page = 1
        loadGrid()
    })
    var text_label_entries1 = document.createTextNode((ta_text_entries.entries)? ta_text_entries.entries : ' entries')
    ta_label_entries.appendChild(text_label_entries)
    ta_label_entries.appendChild(ta_dropdown_entries)
    ta_label_entries.appendChild(text_label_entries1)
    ta_entries_box.appendChild(ta_label_entries)

    return ta_entries_box
}

var taLoadContentTable = function(obj) {
    var taTable = document.getElementById(obj.id)
    taTable.appendChild(taCreateHeaderFooterTable('thead'))

    var ta_tbody = document.createElement('tbody')
    taTable.appendChild(ta_tbody)
    taTable.appendChild(taCreateHeaderFooterTable('tfoot'))
}

/**
 * function create header and footer table
 */
var taCreateHeaderFooterTable =  function(theadOrTfoot) {
    var ta_show = document.createElement(theadOrTfoot)
    var ta_tr = document.createElement('tr')
    ta_params.column_show.forEach(function(v, k) {
        var ta_th = document.createElement('th')
        ta_th.setAttribute('data-sort', true)
        ta_th.setAttribute('class', 'sorting')
        var ta_th_text_node = document.createTextNode(v)
        ta_th.appendChild(ta_th_text_node)
        ta_tr.appendChild(ta_th)
        ta_th.addEventListener('click', function(e) {
            ta_sort_name = ta_params.column_data[k]
            var ta_sesion = (theadOrTfoot === 'thead') ? 'tfoot' : 'thead'
            var ta_map = document.getElementById(ta_params.id).querySelector(ta_sesion).querySelectorAll('th')
            var sort = e.target.getAttribute('data-sort')
            if (sort === 'ASC') {
                sort = 'DESC'
                ta_th.setAttribute('class', 'sorting_desc')
                ta_map[k].setAttribute('class', 'sorting_desc')
            } else {
                sort = 'ASC'
                ta_th.setAttribute('class', 'sorting_asc')
                ta_map[k].setAttribute('class', 'sorting_asc')
            }
            e.target.setAttribute('data-sort', sort)
            ta_sort = e.target.getAttribute('data-sort')
            loadGrid()
        })
    })

    if (ta_isColumn_action) {
        ta_params.column_action.show.forEach(function(v, k) {
            var ta_th = document.createElement('th')
            var ta_th_text_node = document.createTextNode(v)
            ta_th.appendChild(ta_th_text_node)
            ta_tr.appendChild(ta_th)
        })
    }


    ta_show.appendChild(ta_tr)
    return ta_show
}


var taOffset = function(page_number, page_size){
    page_number = 3
    var index = (page_number - 1) * page_size
    return index
}

var loadGrid= function() {
    taLoadDataToGrid({
        ta_link: ta_params.ajax_link,
        ta_data: ta_params.ajax_data
    })
}

var taLoadDataToGrid = function() {
    var ta_link = ta_params.ajax_link
    var ta_data = ta_params.ajax_data
    var ta_arr_data = []
    var ta_key_search = document.getElementById(ta_params.id).parentNode.querySelector('[data-search="true"]').value.trim()
    for (var k in ta_data) {
        if (ta_data[k] === 'page_number') {
            ta_arr_data.push(k + '=' + ta_curent_page)
        } else if (ta_data[k] === 'page_size') {
            ta_arr_data.push(k + '=' + ta_current_page_size)
        } else if(ta_data[k] === 'key') {
            ta_arr_data.push(k + '=' + ta_key_search)
        } else if(ta_data[k] === 'sort_column') {
            ta_arr_data.push(k + '=' + ta_sort_name)
        } else if(ta_data[k] === 'sort_type') {
            ta_arr_data.push(k + '=' + ta_sort)
        }
    }

    if (ta_params.search_group) {
        var ta_search_group = ta_params.search_group
        ta_search_group.forEach(function (v, k) {
            for (var _k in v) {
                ta_arr_data.push(_k + '=' + v[_k])
            }
            // ta_arr_data.push(k + '=' + v)
        })
    }
    
    var ta_type = ta_params.type
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var _ta_data = JSON.parse(this.responseText)
            taLoadData(_ta_data.data[0] , _ta_data.totals)
            taLoadPaging(_ta_data.totals)
        }
    };

    var ta_current_link = ta_link
    
    if (ta_arr_data.length > 0) ta_current_link = ta_current_link + '?' + ta_arr_data.join('&')
    if (ta_type === 'get') {
        xhttp.open('GET',ta_current_link , true);
        xhttp.send();
    }
}

var taLoadData = function(ta_data, totals) {
    var taTbody = document.getElementById(ta_params.id).querySelector('tbody')
    taTbody.innerHTML = ''
    var ta_column_data = ta_params.column_data
    if (totals > 0) {
        ta_data.forEach(function(v, k) {
            var ta_row = v
            var ta_tr = document.createElement('tr')
            ta_column_data.forEach(function (_v , _k) {
                var ta_td = document.createElement('td')
                var ta_text = document.createTextNode(ta_row[_v])
                ta_td.appendChild(ta_text)
                ta_tr.appendChild(ta_td)
            })

            if (ta_isColumn_action) {
                ta_params.column_action.item.forEach(function(v, k) {
                    var ta_td = document.createElement('td')
                    ta_td.innerHTML = v
                    ta_tr.appendChild(ta_td)
                })
            }
            taTbody.appendChild(ta_tr)
        })
    } else {
        var ta_tr = document.createElement('tr')
        ta_tr.setAttribute('class' , 'ta-no-record')
        var text_no_record = document.createTextNode('no record')
        ta_tr.appendChild(text_no_record)
        taTbody.appendChild(ta_tr)
    }
    
    
}

var taCreatePaging = function() {
    var ta_paging_box = document.createElement('div')
    ta_paging_box.setAttribute('class', ta_class_paging)
    return ta_paging_box
}

var taLoadPaging = function(totalsRecord) {
    var taTotalsRecord = totalsRecord
    var ta_page_size = ta_current_page_size
    var ta_totals_page = Math.round(parseInt(taTotalsRecord) / parseInt(ta_page_size))
    taRenderPaging(ta_totals_page)

}

var taRenderPaging = function(ta_totals_page) {
    var ta_parentNode = document.getElementById(ta_params.id).parentNode
    var ta_group = ta_parentNode.querySelector('.' + ta_class_paging)
    ta_group.innerHTML = ''
    
    var ta_paging = document.createElement('ul')

    if (parseInt(ta_totals_page) > 1) {
        var ta_pre = document.createElement('li')
        var ta_pre_box = document.createElement('a')
        var ta_pre_page = (parseInt(ta_curent_page) > 1)? (parseInt(ta_curent_page) - 1) : 1
        var ta_pre_text = document.createTextNode('previous')
        ta_pre_box.appendChild(ta_pre_text)
        ta_pre_box.setAttribute('data-paging', ta_pre_page)
        ta_pre.appendChild(ta_pre_box)
        ta_paging.appendChild(ta_pre)
        ta_pre_box.addEventListener('click', function(e) {
            var _p = e.target.getAttribute('data-paging')
            ta_curent_page = _p
            loadGrid()
        })

    }

    for (var i = 1; i <= parseInt(ta_totals_page); i++) {
        var ta_page = document.createElement('li')
        if (i === parseInt(ta_curent_page)) {
            ta_page.setAttribute('class', 'ta-active')
        }
        
        var ta_page_box = document.createElement('a')
        ta_page_box.setAttribute('data-paging', i)
        ta_page_box.addEventListener('click',  function(e) {
            var _p = e.target.getAttribute('data-paging')
            ta_curent_page = _p
            loadGrid()
        })
        var ta_num_page = document.createTextNode(i)
        ta_page_box.appendChild(ta_num_page)
        ta_page.appendChild(ta_page_box)
        ta_paging.appendChild(ta_page)
    }


    if (parseInt(ta_totals_page) > 1) {
        var ta_next = document.createElement('li')
        var ta_next_box = document.createElement('a')
        var ta_next_page = (parseInt(ta_curent_page) < ta_totals_page)? (parseInt(ta_curent_page) + 1) : parseInt(ta_curent_page)
        var ta_next_text = document.createTextNode('next')
        ta_next_box.appendChild(ta_next_text)
        ta_next_box.setAttribute('data-paging', ta_next_page)
        ta_next.appendChild(ta_next_box)
        ta_paging.appendChild(ta_next)
        ta_next_box.addEventListener('click', function(e) {
            var _p = e.target.getAttribute('data-paging')
            ta_curent_page = _p
            loadGrid()
        })

    }
    ta_group.appendChild(ta_paging)
}
