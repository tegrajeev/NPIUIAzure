var filters = {
    'search':{
        'filters':[            
            {'name':'npi','type': 'text','id':1,'placeholder':'Enter NPI Number','label': 'NPI Number','required':true},
            {'name':'npitype','type': 'select','id':2,'placeholder':'Select NPI Type','label': 'NPI Type','required':true},
            {'name':'specialtygroup','type': 'select','id':3,'placeholder':'Select Specialty Group','label': 'Specialty Group'},
            {'name':'firstname','type': 'text','id':4,'placeholder':'Enter First Name','label':'First Name'},
            {'name':'lastname','type': 'text','id':5,'placeholder':'Enter Last Name','label':'Last Name'},
            {'name':'orgname','type': 'text','id':6,'placeholder':'Enter Organization Name','label':'Organization Name'},
            {'name':'state','type': 'select','id':7,'placeholder':'Select State','label': 'State','required':true},
            {'name':'county','type': 'select','id':8,'placeholder':'Select County','label': 'County','required':true},
            {'name':'zipcode','type': 'select','id':9,'placeholder':'Select Zipcode','label': 'Zipcode','required':true},
            {'name':'geography','type': 'select','id':10,'placeholder':'Select Geography','label': 'Geography','required':false,
            'data':[
                {'label': 'Within 10miles from county population centroid','value': '10','type': 'geography'},
                {'label': 'Within 30miles from county population centroid','value': '30','type': 'geography'},
                {'label': 'Within 60miles from county population centroid','value': '60','type': 'geography'}
            ]
            },
            {'name':'search-npi-radio','type': 'radio','id':11,'placeholder':'Select Option','label': 'Select'},
            {'name':'AffiliatedToHospital','type': 'select','id':12,'placeholder':'Affiliated to Hospital','label':'Affiliated to Hospital',
            },
        ]
    }
};

export default filters;