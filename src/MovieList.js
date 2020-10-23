import React, { Component } from 'react'
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import './DataViewDemo.css';
import movies from './movies'
export default class MovieList extends Component {
    constructor(){ 
        super();
        this.state = {
            movies: movies, //movies verilerini statte tanımlı moviesa atıp işlem sağlıyorum.
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null
        };
        
        this.sortOptions = [
            {label: 'En çok beğenilene göre', value: '!rating'}, //başına ünlem koy
            {label: 'Tür Alfabesine Göre Sırala', value: 'description'},
        ];
    
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    } 

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1,
                sortField: value.substring(1, value.length),
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1,
                sortField: value,
                sortKey: value
            });
        }
    }

    itemTemplate(movie, layout) {
        if (!movie) {
            return;
        }

        if (layout === 'list')
            return this.renderListItem(movie);
        else if (layout === 'grid')
            return this.renderGridItem(movie);
    }
    renderListItem(data) {
        return (
            <div className="p-col-12">
                <div className="movie-list-item">
                    <img src={`images/${data.image}.jpg`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name}  />
                    <div className="movie-list-detail">
                        <div className="movie-name">{data.title}</div>
                        <div className="movie-description">{data.description}</div>
                        <Rating value={data.rating} readonly cancel={false}></Rating>
                    </div>
                   
                </div>
            </div>
        );
    }
  
    renderGridItem(data) {
        return (
            <div className="p-col-12 p-md-4">
                <div className="movie-grid-item card" style={{height:'350px'}}>
                    <div className="movie-grid-item-content">
                    <img src={`images/${data.image}.jpg`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}  style={{width:'100px',height:'100px'}} /> {/*Resim yoksa default resim seçildi.*/}
                        <div className="movie-name">{data.title}</div>
                        <div className="movie-description">{data.description}</div>
                        <Rating value={data.rating} readonly cancel={false}></Rating>
                    </div>
                  
                </div>
            </div>
        );
    }
    render() {
        const header = (
            <div className="p-grid">
                <div className="p-col-12 p-md-4" style={{textAlign:'left'}}>
                <Dropdown options={this.sortOptions} value={this.state.sortKey} optionLabel="label" placeholder="Sırala" onChange={this.onSortChange}/>
                </div>
                <div className="p-col-6 p-md-4">
                    <InputText placeholder="Ara" onKeyUp={event => this.dv.filter(event.target.value)} />  {/*Kullanılmaya çalışıldı ama tam işlev sağlanmadı,tekrar bakılcak.*/}
                </div>
                <div className="p-col-6 p-md-4" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={event => this.setState({layout: event.value})} />
                </div>
            </div>
        );
        return (
            <div className="dataview-demo">
            <div className="card">
                <DataView value={this.state.movies} layout={this.state.layout} header={header} 
                        itemTemplate={this.itemTemplate} paginator="true" rows={9} filterBy="title"
                        sortOrder={this.state.sortOrder} sortField={this.state.sortField} />
            </div>
        </div>
        )
    }
}
